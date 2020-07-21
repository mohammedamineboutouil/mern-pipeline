FROM nginx:stable-alpine

COPY . ./

RUN yarn install --production

ENTRYPOINT ["yarn","start"]

EXPOSE 3305