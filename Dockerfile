# ===== 第一阶段：构建（使用指定版本node安装依赖、构建产物） =====
FROM node:20.19.0-alpine AS builder

WORKDIR /app
COPY . .

RUN npm install && npm run build


# ===== 第二阶段：部署 =====
# 1. 使用官方 Nginx 镜像作为基础
FROM nginx:alpine

# 2. 删除默认的 Nginx 静态文件 /var/www/html/jenkins-demo
RUN rm -rf /var/www/html/jenkins-demo/*

# 3. 拷贝你构建的静态文件到 Nginx 的服务目录
COPY dist/ /var/www/html/jenkins-demo/

# 4. 拷贝自定义 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 5. 拷贝构建产物
COPY --from=builder /app/dist/ /var/www/html/jenkins-demo

# 暴露端口
EXPOSE 80

# 默认启动命令（nginx）
CMD ["nginx", "-g", "daemon off;"]