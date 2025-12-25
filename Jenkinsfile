pipeline {
    agent any

    stages {

        stage('Docker Login') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_PASS'
                    )
                ]) {
                    sh 'docker login -u $DOCKERHUB_USER -p $DOCKERHUB_PASS'
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_PASS'
                    )
                ]) {
                    dir('backend-ci') {
                        sh 'docker build -t $DOCKERHUB_USER/backend-ci:latest .'
                    }
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_PASS'
                    )
                ]) {
                    dir('frontend-ci') {
                        sh 'docker build -t $DOCKERHUB_USER/frontend-ci:latest .'
                    }
                }
            }
        }

        stage('Push Images') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_PASS'
                    )
                ]) {
                    sh '''
                      docker push $DOCKERHUB_USER/backend-ci:latest
                      docker push $DOCKERHUB_USER/frontend-ci:latest
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                  docker-compose down || true
                  docker-compose up -d
                '''
            }
        }
    }
}
