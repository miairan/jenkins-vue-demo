pipeline {
    agent any
    
    environment {
        // 确保每次执行都加载 nvm 目录（jenkins 用户下安装的）
        NVM_DIR = "${env.HOME}/.nvm"
    }

    stages {
        // 代码拉取
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'git://github.com/miairan/jenkins-vue-demo.git'
            }
        }
        // 构建镜像
        stage('Docker Build') {
            // 镜像动态命名：使用commit哈希
            steps {
                script {
                    // 获取 commit hash（前7位）
                    COMMIT_HASH = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                    IMAGE_NAME = "jenkins-vue-demo:${COMMIT_HASH}"
                }
                sh '''#!/bin/bash
                    echo "🛠️ 构建镜像：$IMAGE_NAME"
                    docker build -t $IMAGE_NAME .
                '''
            }
        }

        // 运行容器
        stage('Docker Run') {
            steps {
                sh '''#!/bin/bash
                    echo "🧹 停止并删除旧容器（如果存在）"
                    docker stop jenkins-vue-demo || true
                    docker rm jenkins-vue-demo || true
                    echo "🚀 启动新容器"
                    docker run -d -p 8088:80 --name jenkins-vue-demo $IMAGE_NAME
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
