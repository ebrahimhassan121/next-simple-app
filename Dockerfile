FROM node:alpine

RUN mkdir -p /usr/src/app
ENV PORT 80

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

# Production use node instead of root
# USER node

RUN yarn install

COPY . /usr/src/app

RUN NODE_OPTIONS=--openssl-legacy-provider yarn build

EXPOSE 80
CMD [ "yarn", "start" ]
