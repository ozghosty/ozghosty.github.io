# ozghosty.github.io

OzGhosty website: a custom Jekyll theme deployed with GitHub Pages' built-in Jekyll build.

## Images

Drop images at these paths. Until a file exists, the site shows a gradient placeholder in its place
(locally the placeholder is labelled with the expected path).

| Path | Used for | Suggested size |
| --- | --- | --- |
| `assets/images/logo.png` | Header/footer logo (circular crop) | 256×256 |
| `assets/images/avatar.png` | Sidebar profile picture (circular crop) | 256×256 |
| `assets/images/hero.jpg` | Homepage hero background (subject on the right) | 2400×900 |
| `assets/images/quote.jpg` | Sidebar quote card background | 800×300 |
| `assets/images/posts/*.jpg` | Post thumbnails and post headers (`image:` in front matter) | 1600×900 |

Strip metadata before committing: `exiftool -all= -overwrite_original assets/images/**/*`.

## Writing a post

Create `_posts/YYYY-MM-DD-slug.md`:

```yaml
---
title: My Post
description: One or two sentences shown on cards and in search results.
tags: [Tech, Home Lab]        # first tag is the card label; colours live in _data/tags.yml
image: /assets/images/posts/my-post.jpg
placeholder: tech             # gradient shown if the image is missing: dusk, sunset, ocean, tech, mountain, beach, night, desert
---
```

## Configuration

Everything site-wide lives in `_config.yml`: hero text, bio, quote, social links (blank = hidden) and Giscus comments.

**Comments:** enable Discussions on the repo, install the [giscus app](https://github.com/apps/giscus),
then copy the category ID from [giscus.app](https://giscus.app) into `giscus.category_id`.

## Running locally

With Docker:

```sh
docker run --rm -it -p 4000:4000 -v "$PWD":/srv/jekyll -w /srv/jekyll ruby:3.3 \
  sh -c "bundle install && bundle exec jekyll serve --host 0.0.0.0"
```

Or with Ruby installed: `bundle install && bundle exec jekyll serve`.
