pipeline {
    agent any

    environment {
        DOCKERHUB_USER = credentials('dockerhub-username')
        DOCKERHUB_PASS = credentials('dockerhub-password')
    }

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com//fullstack-app.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t $DOCKERHUB_USER/backend:latest .'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    sh 'docker build -t $DOCKERHUB_USER/frontend:latest .'
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
                  docker push $DOCKERHUB_USER/backend:latest
                  docker push $DOCKERHUB_USER/frontend:latest
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
