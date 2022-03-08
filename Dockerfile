FROM node:17

ARG PORT

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY ./ ./

COPY .env.example .env

EXPOSE $PORT

CMD ["npm", "run", "start"]