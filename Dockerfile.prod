FROM node:17-alpine
ARG VITE_GOOGLE_MAPS_API_KEY
ARG VITE_WEB_SERVICES_URL
ARG VITE_WEB_SOCKET_URL
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm build
CMD [ "pnpm", "preview" ]
EXPOSE 4173