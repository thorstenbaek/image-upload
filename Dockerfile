FROM node:16-alpine AS build
WORKDIR /app
COPY package.json package-lock.json svelte.config.js ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:16-alpine
#FROM mhart/alpine-node:slim-16

WORKDIR /app
COPY --from=build /app .

ENV PORT=80
ENV PUBLIC_API_URL=replace_this_with_url_to_api_in_cluster

ENV NODE_ENV=production
EXPOSE 80

CMD ["node", "./build/index.js"]