FROM node:lts-alpine

COPY . ./

RUN yarn install --production

ENTRYPOINT ["yarn","start"]

EXPOSE 3305
