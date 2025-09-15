pipeline {
    agent any
    
    environment {
        // 确保每次执行都加载 nvm 目录（jenkins 用户下安装的）
        NVM_DIR = "${env.HOME}/.nvm"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/miairan/jenkins-vue-demo.git'
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

                    echo "⬇️  如果未安装则安装 Node.js 22.19.0..."
                    nvm install 22.19.0

                    echo "✅ 使用 Node.js 22.19.0"
                    nvm use 22.19.0

                    echo "🔎 当前 Node 版本："
                    node -v
                    echo "🔎 当前 npm 版本："
                    npm -v
                '''
            }
        }

        stage('Debug') {
            steps {
                sh '''#!/bin/bash
                    echo "📂 当前目录: $(pwd)"
                    echo "📄 package.json 内容:"
                    cat package.json || echo "❌ package.json 不存在"
                    echo "📁 当前目录下文件列表:"
                    ls -al
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''#!/bin/bash
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                    nvm use 22.19.0

                    npm install
                '''
            }
        }

        

        stage('Build') {
            steps {
                sh '''#!/bin/bash
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                    nvm use 22.19.0

                    npm run build
                '''
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t jenkins-vue-demo .'
            }
        }

        stage('Docker Run') {
            steps {
                sh '''
                docker stop jenkins-vue-demo || true
                docker rm jenkins-vue-demo || true
                docker run -d -p 8088:80 --name jenkins-vue-demo jenkins-vue-demo
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
