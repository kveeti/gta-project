FROM node:16-alpine

USER root

WORKDIR /app

COPY . .

RUN yarn
RUN yarn build

EXPOSE 5000

CMD ["yarn", "start", "-p", "5000"]