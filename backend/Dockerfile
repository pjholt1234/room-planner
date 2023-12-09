FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

ENV PORT=3001
ENV DB_HOST=mongodb
ENV DB_NAME=room-planner
ENV DB_PORT=27017
ENV APP_PORT=3001
ENV BASIC_AUTH_SECRET=testing123

EXPOSE 3001

COPY . .

RUN npm run build

CMD ["npm", "run", "dev"]

