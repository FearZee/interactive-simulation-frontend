FROM node AS builder
ENV API_BASE_URL=

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM nginx:stable-alpine
ENV API_BASE_URL=

COPY --from=builder /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]