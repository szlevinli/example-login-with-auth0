FROM node:latest

WORKDIR /home/app
USER node

RUN yarn config set registry "https://registry.npm.taobao.org/"
RUN npm config set registry "https://registry.npm.taobao.org/"
RUN git config --global user.name "Levin Li"
RUN git config --global user.email "3259963@qq.com"

ENV PORT 3000

EXPOSE 3000
EXPOSE 4000
