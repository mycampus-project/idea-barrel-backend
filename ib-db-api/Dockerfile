FROM node:latest
COPY package*.json ./
RUN npm install
RUN npm install pm2 -g
COPY ./ .
CMD ["pm2-runtime", "index.js"]