FROM node:alpine
WORKDIR /usr/src/app
EXPOSE 3000
COPY ./ ./
RUN npm install
CMD ["npm", "start"]