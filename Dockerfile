# 1. 使用官方 Nginx 镜像作为基础
FROM nginx:alpine

# 2. 删除默认的 Nginx 静态文件 /var/www/html/jenkins-demo
RUN rm -rf /var/www/html/jenkins-demo/*

# 3. 拷贝你构建的静态文件到 Nginx 的服务目录
COPY dist/ /var/www/html/jenkins-demo/

# 4. 暴露端口
EXPOSE 80

# 5. 默认启动命令（nginx）
CMD ["nginx", "-g", "daemon off;"]