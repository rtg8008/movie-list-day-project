FROM node:14-alpine
RUN mkdir -p /src/app
WORKDIR /src/app
COPY . /src/app/
RUN npm install
# RUN npx knex migrate:rollback --all
# RUN npx knex migrate:latest
# RUN npx knex seed:run
RUN yarn global add nodemon
EXPOSE 8080
CMD [ "npm", "start" ]