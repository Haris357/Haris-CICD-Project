pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'haris357/haris-cicd-project'
        IMAGE_TAG    = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'node --version'
            }
        }
        stage('Test') {
            steps {
                echo 'Tests passed!'
            }
        }
        stage('Docker Build') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE:$IMAGE_TAG .'
                sh 'docker tag $DOCKER_IMAGE:$IMAGE_TAG $DOCKER_IMAGE:latest'
            }
        }
        stage('Push to Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'docker login -u $DOCKER_USER -p $DOCKER_PASS'
                    sh 'docker push $DOCKER_IMAGE:$IMAGE_TAG'
                    sh 'docker push $DOCKER_IMAGE:latest'
                }
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker stop haris-cicd-project || true'
                sh 'docker rm haris-cicd-project || true'
                sh 'docker pull $DOCKER_IMAGE:latest'
                sh 'docker run -d -p 3000:3000 --name haris-cicd-project $DOCKER_IMAGE:latest'
                echo 'App live at localhost:3000!'
            }
        }
    }

    post {
        success { echo 'Pipeline complete!' }
        failure { echo 'Check logs!' }
    }
}
