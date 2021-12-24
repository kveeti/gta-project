FROM node

USER root

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY .env .env
COPY src src

RUN yarn
RUN yarn build

EXPOSE 5000

CMD ["yarn", "start"]