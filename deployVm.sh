#!/bin/bash

# docker rmi --force  $(docker images -f dangling=true -q)
# docker run -p 4000:4000 --env-file ./server/.env notnot
# --progress=plain --no-cache --pull
# docker system prune -a

# docker buildx build \
# -t notnot \
# --build-arg "VITE_DISCORD_GET_USER_CODE=https://discord.com/oauth2/authorize?client_id=1075578805579698196&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2F&response_type=code&scope=guilds%20identify" \
# --build-arg "VITE_DISCORD_ADD_BOT_TO_SERVER=https://discord.com/api/oauth2/authorize?client_id=1075578805579698196&permissions=34816&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2F&scope=bot" \
# --build-arg "VITE_API_BASE=http://localhost:4000" .

set -e

# docker compose requires env 
# TODO build env
# Docker compose build
# docker compose up