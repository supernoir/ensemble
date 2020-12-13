FROM mhart/alpine-node:8.11.4
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
EXPOSE 3000
CMD ["npm", "start"]
