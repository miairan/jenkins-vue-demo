// def IMAGE_NAME = "" // def用在脚本中定义局部变量，用在脚本外定义全局变量。Jenkinsfile使用Groovy声明式，声明式规范中在pipeline外定义变量不生效，只是Jenkins在运行声明式Jenkinsfile时，会先转换为脚本式运行，所以这儿生效了。声明式推荐在environment和parameters里定义全局变量。
pipeline {
    agent any
    
    environment { // 用于声明 环境变量，在构建过程中注入这些变量（每步构建都会），可读写。
        // DOCKER_BUILDKIT = '0' // 关闭BuildKit（Docker28+开始这个值默认是1）
        // DOCKER_CLI_EXPERIMENTAL = 'disabled' // 禁用（Docker28+开始这个值默认是true）
        IMAGE_NAME = ''
    }
    parameters { // 用于声明 构建参数，可在UI页面填写或默认使用，只读。
        string(name: 'GIT_CREDENTIALS_ID', defaultValue: 'github-ssh', description: 'Git SSH Key Credential ID')
        string(name: 'BRANCH_NAME', defaultValue: 'main')
    }
    
    stages {
        // 代码拉取
        stage('Checkout') {
            steps {
                $class: 'GitSCM', // 调用的“底层构建器类”，可选值"GitSCM"（最常见）、"SubversionSCM"、"CVSSCM"、"MultiSCM"（同时拉多个SCM源）
                userRemoteConfigs: [
                    [
                        url: 'git@github.com:miairan/jenkins-vue-demo.git',
                        credentialsId: "${params.GIT_CREDENTIALS_ID}" // 在Credentials里查找ID=构建参数的凭据来使用，Job配置页面下拉选的Credentials失效。如果有Passphrase，因为创建凭据时，已经添加了Passphrase（且必须这么添加），所以此处就不用（也不能）配置。
                    ]
                ],
                branches: [[name: "*/${params.BRANCH_NAME}"]]
            }
        }
        stage('Check Docker Build Mode') {
            steps {
                sh '''
                echo "[DEBUG] Jenkins docker path: $(which docker)"
                echo "[DEBUG] docker --version: $(docker --version)"
                echo "[DEBUG] DOCKER_BUILDKIT=$DOCKER_BUILDKIT"
                echo "[DEBUG] DOCKER_CLI_EXPERIMENTAL=$DOCKER_CLI_EXPERIMENTAL"
                '''
            }
        }
        // 构建镜像
        stage('Docker Build') {
            // 镜像动态命名：使用commit哈希
            steps {
                script {
                    // 获取 commit hash（前7位）
                    def commitRaw = sh(script: "git rev-parse --short HEAD", returnStdout: true)
                    def COMMIT_HASH = commitRaw.trim().replaceAll("[^a-zA-Z0-9]", "") // 只保留合法字符
                    env.IMAGE_NAME = "jenkins-vue-demo:${COMMIT_HASH}"
                }
                echo "🛠️ 构建镜像：${env.IMAGE_NAME}"
                sh """#!/bin/bash
                    command -v docker
                    docker build --load -t $IMAGE_NAME .
                """
            }
        }

        // 运行容器
        stage('Docker Run') {
            steps {
                sh """#!/bin/bash
                    echo "🧹 停止并删除旧容器（如果存在）"
                    docker stop jenkins-vue-demo || true
                    docker rm jenkins-vue-demo || true
                    echo "🚀 启动新容器"
                    docker run -d -p 8088:80 --name jenkins-vue-demo $IMAGE_NAME
                """
            }
        }

        
    }

    post {
        always {
            echo "构建完成"
        }
    }
}
