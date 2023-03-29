FROM node:lts-alpine

WORKDIR /usr/src/app

COPY ["server/package.json", "server/yarn.lock*", "./"]
COPY ["server/build/out.js", "./build/"]
COPY server/dist ./dist 

RUN yarn install
EXPOSE 4000

RUN chown -R node /usr/src/app
USER node

CMD ["node", "build/out.js"]
