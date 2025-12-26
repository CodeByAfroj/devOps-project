// pipeline {
//     agent any

//     stages {

//         stage('Docker Login') {
//             steps {
//                 withCredentials([
//                     usernamePassword(
//                         credentialsId: 'dockerhub-creds',
//                         usernameVariable: 'DOCKERHUB_USER',
//                         passwordVariable: 'DOCKERHUB_PASS'
//                     )
//                 ]) {
//                     sh 'docker login -u $DOCKERHUB_USER -p $DOCKERHUB_PASS'
//                 }
//             }
//         }

//         stage('Build Backend Image') {
//             steps {
//                 withCredentials([
//                     usernamePassword(
//                         credentialsId: 'dockerhub-creds',
//                         usernameVariable: 'DOCKERHUB_USER',
//                         passwordVariable: 'DOCKERHUB_PASS'
//                     )
//                 ]) {
//                     dir('backend-ci') {
//                         sh 'docker build -t $DOCKERHUB_USER/backend-ci:latest .'
//                     }
//                 }
//             }
//         }

//         stage('Build Frontend Image') {
//             steps {
//                 withCredentials([
//                     usernamePassword(
//                         credentialsId: 'dockerhub-creds',
//                         usernameVariable: 'DOCKERHUB_USER',
//                         passwordVariable: 'DOCKERHUB_PASS'
//                     )
//                 ]) {
//                     dir('frontend-ci') {
//                         sh 'docker build -t $DOCKERHUB_USER/frontend-ci:latest .'
//                     }
//                 }
//             }
//         }

//         stage('Push Images') {
//             steps {
//                 withCredentials([
//                     usernamePassword(
//                         credentialsId: 'dockerhub-creds',
//                         usernameVariable: 'DOCKERHUB_USER',
//                         passwordVariable: 'DOCKERHUB_PASS'
//                     )
//                 ]) {
//                     sh '''
//                       docker push $DOCKERHUB_USER/backend-ci:latest
//                       docker push $DOCKERHUB_USER/frontend-ci:latest
//                     '''
//                 }
//             }
//         }

//         stage('Deploy') {
//             steps {
//                 sh '''
//                   docker-compose down || true
//                   docker-compose up -d
//                 '''
//             }
//         }
//     }
// }





pipeline {
    agent any

    environment {
        DOCKERHUB_CREDS = credentials('dockerhub-creds')
        DOCKERHUB_USER  = "${DOCKERHUB_CREDS_USR}"
        DOCKERHUB_PASS  = "${DOCKERHUB_CREDS_PSW}"
    }

    stages {

        stage('Docker Login') {
            steps {
                sh 'docker login -u $DOCKERHUB_USER -p $DOCKERHUB_PASS'
            }
        }

        stage('Build & Push Images') {
            steps {
                script {
                    def apps = ['backend-ci', 'frontend-ci']

                    for (app in apps) {
                        dir(app) {
                            sh """
                                docker build -t $DOCKERHUB_USER/${app}:latest .
                                docker push  $DOCKERHUB_USER/${app}:latest
                            """
                        }
                    }
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
