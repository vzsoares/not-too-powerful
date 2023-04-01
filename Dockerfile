FROM node:lts-alpine as builder

WORKDIR /usr/src/app

COPY ["server/package.json", "server/yarn.lock*", "./"]
COPY ["server/build/out.js", "./build/"]
COPY ["server/dist", "./dist"]

RUN yarn install --production[=true] --frozen-lockfile && yarn cache clean --all

# https://stackoverflow.com/questions/24394243/why-are-docker-container-images-so-large
FROM node:lts-alpine
COPY --from=builder /usr/src/app /usr/src/app

WORKDIR /usr/src/app
EXPOSE 4000

RUN chown -R node /usr/src/app
USER node

CMD ["node", "build/out.js"]