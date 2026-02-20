FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN npm run build || true
EXPOSE 5000
CMD ["node","dist/index.js"]
