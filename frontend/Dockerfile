FROM node:alpine as builder

WORKDIR /usr/src/app
ENV PATH /usr/src/node_modules/.bin:$PATH

# inject all environment vars we'll need
ARG VITE_DOTNET_SERVICE_URL
ARG VITE_JAVA_SERVICE_URL
# expose the variable to the finished container
ENV VITE_DOTNET_SERVICE_URL=${VITE_DOTNET_SERVICE_URL}
ENV VITE_JAVA_SERVICE_URL=${VITE_JAVA_SERVICE_URL}

COPY package*.json ./
RUN npm install

COPY . .

FROM builder as dev
CMD ["npm", "run", "dev"]

FROM builder as prod-builder
RUN npm run build

FROM nginx:stable-alpine as production-stage

COPY --from=prod-builder /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]