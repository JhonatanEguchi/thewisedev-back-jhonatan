FROM node:14
WORKDIR /app
COPY ./src ./src
COPY tsconfig-build.json .
COPY tsconfig.json .
COPY ./package.json .
RUN npm install
RUN npm run build-docker
EXPOSE 8000
CMD npm run start
