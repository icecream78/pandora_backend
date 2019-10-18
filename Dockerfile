FROM node:alpine

WORKDIR /app
COPY package*.json ./

RUN npm install --only=production
COPY . /app

ENV PORT 3001
CMD ["npm", "start"]
