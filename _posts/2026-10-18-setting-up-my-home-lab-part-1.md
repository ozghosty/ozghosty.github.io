---
title: Setting Up My Home Lab (Part 1)
description: Why I'm using a NUC, Raspberry Pi and Docker to build a flexible home lab for learning, creating and tinkering.
tags: [Tech, Home Lab]
image: /assets/images/posts/home-lab.jpg
placeholder: tech
---

I've wanted a proper home lab for years. Not a rack of humming servers, just a small, quiet setup that I can break, rebuild and learn from.

This is part one: the why and the hardware.

## Goals

1. **Low power and quiet.** It lives in the house, so it has to be invisible.
2. **Everything in containers.** If I can't rebuild it from a compose file, it doesn't count.
3. **Room to experiment.** Self-hosting, home automation, local AI models and whatever else catches my interest.

## The hardware

| Device | Role |
| --- | --- |
| Intel NUC | Main Docker host |
| Raspberry Pi | DNS, monitoring and lightweight services |
| External SSD | Backups and media |

## Docker all the things

Every service gets its own folder with a `docker-compose.yml`:

```yaml
services:
  uptime:
    image: louislam/uptime-kuma:1
    restart: unless-stopped
    ports:
      - "3001:3001"
    volumes:
      - ./data:/app/data
```

Keeping everything declarative means I can wipe a machine and be back up in minutes.

## Next up

In part two I'll cover networking, reverse proxies and how I'm handling backups, which is the part most home labs skip until it's too late.
