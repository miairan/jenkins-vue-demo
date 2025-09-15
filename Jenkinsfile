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
                git credentialsId: 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDJ7wWz+Rv7ejQDfMl3MoZEtiMY+zFw66yRFoSLwbkL0IzMWD01IrNu5pbSHxDZ6NulJG/yg/7z+xFI5+S16IBYe/6C1RwMiRBF6bBunR343DonGzw5u8SBqr6NSLe8G6r5SP+OHeNmzC6lk4UlSsF6q3g9W0OvyFbD5A2LVEIykeiBcgh69TRMQSujOmw+j7leiidGhIzuSLg2BquJxLGcDGi1lv65ZKYmL6VMJdazMfGRwSFK2NAzKqdLa7OfOhbxuGYafRYChvEx5gyWKfDsjMD1tappizrpXrm/oKo1SimdgpuQuoEev1idr+VoNco6zbSLKd2988bJvSEmxBFAJtZDlBD587/GVhVqoTHBazRzqbRJvvOvV2AMrPutyEQd13b7XoAuCMdWpy2wZOyB36dVJZZlo5lzaKZuUxfqDhwxaD+d9pZ2etLHuzsL4jdxem9GROv0/mLuKNAlXhG0RduxgLoPBiEiQyKULx3wHaRQHi9lcbPWdZz10pxceTxRDoBa0xVSITuiJ63pCjOvmwQLZp12dAz6+VmCAR9YUmwHp1cuNrhbPSqtIwNSnxCb9On/t8SNNzxObzkZibC6dV5ucK1+tze4PBGDqpOl+8FqAHGkGIoAMqYJf0NVvtyfYtA6nFszG+dMhADkb+Fo4f4Gi/oKqkF94VRuVsPIVw== jenkins@ci',
                    branch: 'main', 
                    url: 'git@github.com:miairan/jenkins-vue-demo.git'
            }
        }
        // 构建镜像
        stage('Docker Build') {
            // 镜像动态命名：使用commit哈希
            steps {
                script {
                    // 获取 commit hash（前7位）
                    def COMMIT_HASH = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                    def IMAGE_NAME = "jenkins-vue-demo:${COMMIT_HASH}"
                }
                sh '''#!/bin/bash
                    echo "🛠️ 构建镜像：${IMAGE_NAME}"
                    docker build -t ${IMAGE_NAME} .
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
