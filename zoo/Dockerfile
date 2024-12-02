FROM node:20.18-alpine AS builder

RUN apk add --no-cache python3 make g++ bash libc6-compat

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .
