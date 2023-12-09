FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000
ENV APP_PORT=3001

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host"]

