FROM node:18

WORKDIR /app

COPY package.json . 
COPY package-lock.json . 
RUN npm install

COPY . .

COPY .env.local .env.local

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
