FROM node:lts-alpine as builder

WORKDIR /usr/src/app

ARG YARN_INSTALL="yarn install --production[=true] --frozen-lockfile"
ARG YARN_CLEAN="yarn cache clean --all"

ARG VITE_DISCORD_GET_USER_CODE
ARG VITE_DISCORD_ADD_BOT_TO_SERVER
ARG VITE_API_BASE

# TEST ARGS
RUN test -n "$VITE_DISCORD_GET_USER_CODE" && \
test -n "$VITE_DISCORD_ADD_BOT_TO_SERVER" && \
test -n "$VITE_API_BASE" \
|| (echo "No essential arg variables provided" && false)

COPY [".", "./"]

# GENERATE client .env
RUN touch client/.env && \
echo "VITE_DISCORD_GET_USER_CODE=$VITE_DISCORD_GET_USER_CODE" >> client/.env && \
echo "VITE_DISCORD_ADD_BOT_TO_SERVER=$VITE_DISCORD_ADD_BOT_TO_SERVER" >> client/.env && \
echo "VITE_API_BASE=$VITE_API_BASE" >> client/.env

# BUILD client
RUN (cd client/ && $YARN_INSTALL && $YARN_CLEAN && yarn vite build --emptyOutDir --outDir ../server/dist/)

# BUILD server
RUN (cd server/ && $YARN_INSTALL && $YARN_CLEAN && yarn build)

FROM alpine
WORKDIR /usr/src/app
COPY --from=builder ["/usr/src/app/server/node_modules", "./node_modules"]
COPY --from=builder ["/usr/src/app/server/build", "./build"]
COPY --from=builder ["/usr/src/app/server/dist", "./dist"]
COPY --from=builder ["/usr/src/app/server/package.json", "/usr/src/app/server/yarn.lock", "./"]

RUN apk add --update nodejs

EXPOSE 4000

CMD ["node", "build/out.js"]
