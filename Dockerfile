FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["server/package.json", "server/yarn.lock*", "./dist", "./"]
COPY ["server/build/out.js", "./build/"]
RUN yarn install
EXPOSE 4000
RUN chown -R node /usr/src/app
USER node
CMD ["node", "build/out.js"]
