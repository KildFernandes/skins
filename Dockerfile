# Dockerfile
FROM node:12.13.0-alpine
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN addgroup -S app && adduser -S -G app app 
COPY skins/ .
RUN npm install
RUN chown -R app:app /opt/app
USER app
EXPOSE 3000
CMD [ "npm", "run", "pm2" ]