FROM node:22.12.0-slim

RUN apt update && \
apt install openssl procps -y && \
npm install -g @nestjs/cli@10.4.9 @nestjs/websockets @nestjs/platform-socket.io


USER node

WORKDIR /home/node/app

CMD [ "tail", "-f", "/dev/null" ]