FROM node:17-alpine
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .

CMD [ "pnpm", "dev" ]
EXPOSE 3000