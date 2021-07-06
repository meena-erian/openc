FROM node:12.16.3

WORKDIR /code

COPY . /code

RUN npm install 

CMD ["npm", "start"]