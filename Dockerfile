# ==== CONFIGURE =====
FROM node:18-alpine as builder

RUN apk add --no-cache --virtual .gyp python3 make g++

# Set the working directory to /app inside the container
WORKDIR /var/www/crm-web

# Rebuild node-sass
RUN npm rebuild node-sass

# Copy app files
COPY . .

# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm install

# Set the env to "production"
ENV NODE_ENV production

EXPOSE 80

# Build the app
CMD ["npm", "run", "start"]

# Bundle static assets with nginx
#FROM nginx:1.21.0-alpine as production
#
#ENV NODE_ENV production
#
## Copy built assets from `builder` image
#COPY --from=builder /var/www/crm-web/build /var/www/crm-web/build
#
## Add your nginx.conf
#COPY ./docker/nginx/conf.d/nginx.conf /etc/nginx/conf.d/default.conf
#
## Expose port
#EXPOSE 80
#
## Start nginx
#CMD ["nginx", "-g", "daemon off;"]