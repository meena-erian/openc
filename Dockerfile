FROM node:12.16.3

WORKDIR /code

COPY . /code

RUN yarn install 

CMD yarn start