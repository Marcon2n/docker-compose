FROM node

WORKDIR /app

COPY package.json .
RUN yarn install

COPY . .

## EXPOSE [Port you mentioned in the vite.config file]

EXPOSE 3001

CMD ["npm", "run", "dev"]