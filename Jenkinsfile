pipeline {
    agent any

    environment {
        DOCKERHUB_USER = credentials('dockerhub-username')
        DOCKERHUB_PASS = credentials('dockerhub-password')
    }

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/CodeByAfroj/devOps-project.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend-ci') {
                    sh 'docker build -t $DOCKERHUB_USER/backend-ci:latest .'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend-ci') {
                    sh 'docker build -t $DOCKERHUB_USER/frontend-ci:latest .'
                }
            }
        }

        stage('Docker Login') {
            steps {
                sh 'echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin'
            }
        }

        stage('Push Images') {
            steps {
                sh '''
                  docker push $DOCKERHUB_USER/backend-ci:latest
                  docker push $DOCKERHUB_USER/frontend-ci:latest
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                  docker-compose down
                  docker-compose up -d
                '''
            }
        }
    }
}
