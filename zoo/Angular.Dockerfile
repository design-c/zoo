FROM node:20.18-alpine AS builder

ARG PROJECT
ENV PROJECT=$PROJECT

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

RUN npx nx build $PROJECT --prod

FROM nginx

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/apps/**/browser  /usr/share/nginx/html
COPY --from=builder /app/dist/apps/**  /usr/share/nginx/html
