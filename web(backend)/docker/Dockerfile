# 选取构建环境的docker镜像，这里选的是node v.8
FROM node:8 

# Create app directory in this image
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# 应用程序的端口为 8080，所以可以使用 EXPOSE 命令使它与 docker 的镜像做映射
EXPOSE 8080

# 执行npm的指令
CMD [ "npm", "start" ]