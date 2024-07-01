FROM node:20-alpine3.19

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY ecosystem.config.js .
COPY .husky .
COPY .env .
COPY ./src/ ./src

RUN apk add python3
RUN npm install -g pm2
RUN npm install
RUN npm run build

EXPOSE 3838

CMD ["npm", "run", "start", "--env"]