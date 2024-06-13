FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --production

COPY --from=builder /usr/src/app/dist ./dist

CMD ["yarn", "start:prod"]

EXPOSE 3000