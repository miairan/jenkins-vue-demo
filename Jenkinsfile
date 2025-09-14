pipeline {
    agent any
    
    environment {
        // 确保每次执行都加载 nvm 目录（jenkins 用户下安装的）
        NVM_DIR = "${env.HOME}/.nvm"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/miairan/jenkins-demo.git'
            }
        }
        
        stage('Check nvm & Node.js') {
            steps {
                sh '''#!/bin/bash
                    echo "👉 当前用户是：$(whoami)"
                    echo "👉 NVM_DIR=$NVM_DIR"
                    ls -la $NVM_DIR

                    # 加载 nvm
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

                    echo "🔍 可用 Node.js 版本列表："
                    nvm ls

                    echo "⬇️  如果未安装则安装 Node.js 18.18.2..."
                    nvm install 18.18.2

                    echo "✅ 使用 Node.js 18.18.2"
                    nvm use 18.18.2

                    echo "🔎 当前 Node 版本："
                    node -v
                    echo "🔎 当前 npm 版本："
                    npm -v
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''#!/bin/bash
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                    nvm use 18.18.2

                    npm install
                '''
            }
        }

        stage('Run Tests') {
            steps {
                sh '''#!/bin/bash
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                    nvm use 18.18.2

                    npm test
                '''
            }
        }

        stage('Build') {
            steps {
                sh '''#!/bin/bash
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                    nvm use 18.18.2

                    npm run build
                '''
            }
        }

        stage('Deploy to Nginx') {
            steps {
                sh '''#!/bin/bash
                    echo "📦 开始部署..."

                    # 假设构建产物输出在 dist 目录
                    BUILD_DIR=dist

                    # 假设 Nginx 的部署目录为 /var/www/html/jenkins-demo
                    DEPLOY_DIR=/var/www/html/jenkins-demo

                    # 创建部署目录（如果不存在）
                    sudo mkdir -p $DEPLOY_DIR

                    # 拷贝构建文件（注意：Jenkins 默认工作目录可能不是 root 用户）
                    sudo cp -r $BUILD_DIR/* $DEPLOY_DIR/

                    echo "✅ 部署完成，已更新到 $DEPLOY_DIR"
                '''
            }
        }
    }

    post {
        always {
            echo "构建完成"
        }
    }
}
