FROM node:20-slim

COPY . /code/
COPY package.json package-lock.json ./code/
WORKDIR /code
RUN apt-get update && apt-get install rsync -y
RUN npm --prefix /code/ install