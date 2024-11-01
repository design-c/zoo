FROM node:20.18-alpine  AS build

WORKDIR /usr/src/app
COPY ./apps/zoo-mobile/package*.json ./
RUN npm install

COPY ./apps/angular-app ./
RUN npm run build --prod

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

COPY --from=build /usr/src/app/dist/angular-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
