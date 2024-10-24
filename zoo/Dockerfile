FROM node:20.18-alpine AS builder

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .
