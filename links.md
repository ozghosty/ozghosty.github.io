---
title: OzGhosty links
description: Daily walks along Manly Beach. What's on, surf reports and local news, plus where to watch and how to support.
permalink: /links/
---
{%- assign latest = site.tags["Manly Beach Report"] | first -%}

G'day! I'm OzGhosty, a Manly Beach local. Most mornings I walk the beach and post a **Manly Beach Report**: what's on in Manly today, Northern Beaches news, the stories behind the landmarks, and the surf and weather.

{% if latest %}
<a class="btn" href="{{ latest.url | relative_url }}">{% include icon.html name="arrow" %}Latest: {{ latest.title }}</a>
{% endif %}

## Watch

<div class="link-list">
  <a class="card" href="{{ site.social.youtube }}" rel="me noopener" target="_blank">{% include icon.html name="youtube" %}<span><strong>YouTube</strong> · the full daily walk</span></a>
  <a class="card" href="{{ site.social.tiktok }}" rel="me noopener" target="_blank">{% include icon.html name="tiktok" %}<span><strong>TikTok</strong> · Manly in 60 seconds</span></a>
  <a class="card" href="{{ site.social.instagram }}" rel="me noopener" target="_blank">{% include icon.html name="instagram" %}<span><strong>Instagram</strong> · daily Reels</span></a>
  <a class="card" href="{{ site.social.reddit }}" rel="me noopener" target="_blank">{% include icon.html name="reddit" %}<span><strong>r/ozghosty</strong> · chat about the walks</span></a>
  <a class="card" href="{{ '/blog/' | relative_url }}">{% include icon.html name="rss" %}<span><strong>Blog</strong> · every episode with transcript</span></a>
</div>

## Support

The walks are free. If you enjoy them, a coffee or a Patreon membership keeps them coming.

{% include support.html %}
