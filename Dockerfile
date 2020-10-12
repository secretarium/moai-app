# Start base stage
FROM node:lts AS base
WORKDIR /app
COPY . .
RUN mkdir -p packages/mobile
RUN yarn install > /install.log || true
RUN mv /tmp /toto

# Start build stage
FROM base AS build
WORKDIR /app
RUN yarn install
ENV NODE_ENV=production
RUN yarn build
RUN cd packages/www && ./node_modules/.bin/next telemetry disable

# Start production construction stage
FROM node:lts AS production
WORKDIR /app
RUN echo "export PATH=$PATH:./node_modules/.bin" > /etc/environment

# Add package.json manifests
COPY ./package.json ./
COPY --from=build /app/packages/strapi/package.json ./packages/strapi/
COPY --from=build /app/packages/www/package.json ./packages/www/

# Copy built artifacts
COPY --from=build /app/packages/strapi/api ./packages/strapi/api
COPY --from=build /app/packages/strapi/build ./packages/strapi/build
COPY --from=build /app/packages/strapi/config ./packages/strapi/config
COPY --from=build /app/packages/strapi/extensions ./packages/strapi/extensions
COPY --from=build /app/packages/strapi/public ./packages/strapi/public
COPY --from=build /app/packages/www/.next ./packages/www/.next
COPY --from=build /app/packages/www/public ./packages/www/public

# Copy base modules
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/packages/strapi/node_modules ./packages/strapi/node_modules
COPY --from=base /app/packages/www/node_modules ./packages/www/node_modules

# Configure exposure and startup
EXPOSE 3000
RUN mkdir /data
ENV CMS_DATABASE_FILENAME=/data/data.db
ENV CMS_PUBLIC_DIRECTORY=/data/public
CMD /bin/sh -c 'yarn --cwd /app/packages/strapi start & yarn --cwd /app/packages/www start -H 0.0.0.0'
