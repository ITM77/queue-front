# ==== CONFIGURE =====
FROM node:18-alpine as builder

# Set the working directory to /app inside the container
WORKDIR /var/www/crm-web

# Copy package.json to install deps
COPY package.json ./

# Rebuild node-sass
RUN npm rebuild node-sass

# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm install

# Copy app files
COPY . .

# Build the app
RUN npm run build

# Set the env to "production"
ENV NODE_ENV production

# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000

# Build the app
RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production

ENV NODE_ENV production

# Copy built assets from `builder` image
COPY --from=builder /var/www/crm-web/build /var/www/crm-web/build

# Add your nginx.conf
COPY ./docker/nginx/conf.d/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]