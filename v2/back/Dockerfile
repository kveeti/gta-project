FROM node

USER root

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 5000

CMD ["./node_modules/ts-node-dev/lib/bin.js", "--poll", "src/index.ts"]