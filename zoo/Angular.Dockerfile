FROM node:20.18-alpine AS builder

ENV PROJECT=zoo-mobile

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

RUN npx nx build $PROJECT --prod

FROM nginx
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/apps/zoo-mobile /usr/share/nginx/html
