@echo off
setlocal
rem Serves the site at http://localhost:4000 using Jekyll in Docker.
rem Rebuilds on file changes and live-reloads the browser.
rem Usage: serve.bat            (development mode, image placeholders show expected paths)
rem        serve.bat production (renders exactly like the live site)

cd /d "%~dp0"

rem Use the Windows tools explicitly; Git Bash puts GNU timeout/curl first on PATH.
set "WAIT=%SystemRoot%\System32\timeout.exe"
set "CURL=%SystemRoot%\System32\curl.exe"

set "JEKYLL_ENV=development"
if /i "%~1"=="production" set "JEKYLL_ENV=production"

docker info >nul 2>&1
if not errorlevel 1 goto docker_ready
echo Docker isn't running. Starting Docker Desktop...
start "" "%ProgramFiles%\Docker\Docker\Docker Desktop.exe"
:wait_docker
%WAIT% /t 3 /nobreak >nul
docker info >nul 2>&1
if errorlevel 1 goto wait_docker
:docker_ready

rem Stop a previous server if one is still running.
docker rm -f ozg-serve >nul 2>&1

rem Open the browser once the server responds (first run can take a minute while gems install).
start "" /min cmd /c "for /l %%i in (1,1,300) do @(%CURL% -s -o nul http://localhost:4000/ && (start http://localhost:4000/ & exit) || %WAIT% /t 1 /nobreak >nul)"

echo Starting Jekyll (%JEKYLL_ENV%) at http://localhost:4000 - press Ctrl+C to stop.
docker run --rm -it --name ozg-serve ^
  -p 4000:4000 -p 35729:35729 ^
  -e JEKYLL_ENV=%JEKYLL_ENV% ^
  -v "%CD%:/srv/site" ^
  -v ozg-gems:/usr/local/bundle ^
  -w /srv/site ^
  ruby:3.3 ^
  sh -c "bundle check >/dev/null || bundle install && bundle exec jekyll serve --host 0.0.0.0 --livereload --force_polling"
