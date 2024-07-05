FROM node:18-alpine As development

# FROM node:20.11.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force
RUN npm install --legacy-peer-deps

COPY . .

RUN npx prisma generate
RUN npm run build

CMD [ "npm", "run", "start:dev" ]