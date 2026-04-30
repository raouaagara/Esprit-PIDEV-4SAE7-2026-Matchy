pipeline {
    agent any

    environment {
        DOCKER_HUB_USERNAME = 'salmahaouarii'
        SONAR_HOST_URL      = 'http://localhost:9000'
        NEXUS_URL           = 'http://localhost:8081/repository/maven-snapshots/'
        NEXUS_REPO_ID       = 'nexus-snapshots'
    }

    tools {
        maven 'Maven-3.9'
        jdk   'Java-21'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
                    dir('backend') {
                        sh """
                            mvn sonar:sonar \
                              -Dsonar.projectKey=chat-service \
                              -Dsonar.host.url=${SONAR_HOST_URL} \
                              -Dsonar.login=${SONAR_TOKEN}
                        """
                    }
                    dir('discovery-server') {
                        sh """
                            mvn sonar:sonar \
                              -Dsonar.projectKey=discovery-server \
                              -Dsonar.host.url=${SONAR_HOST_URL} \
                              -Dsonar.login=${SONAR_TOKEN}
                        """
                    }
                    dir('api-gateway') {
                        sh """
                            mvn sonar:sonar \
                              -Dsonar.projectKey=api-gateway \
                              -Dsonar.host.url=${SONAR_HOST_URL} \
                              -Dsonar.login=${SONAR_TOKEN}
                        """
                    }
                }
            }
        }

        stage('Maven Build') {
            steps {
                dir('backend')          { sh 'mvn clean package -DskipTests' }
                dir('discovery-server') { sh 'mvn clean package -DskipTests' }
                dir('api-gateway')      { sh 'mvn clean package -DskipTests' }
            }
        }

        stage('Nexus Deploy') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'nexus-credentials',
                    usernameVariable: 'NEXUS_USER',
                    passwordVariable: 'NEXUS_PASS'
                )]) {
                    dir('backend') {
                        sh """
                            mvn deploy -DskipTests \
                              -DaltDeploymentRepository=${NEXUS_REPO_ID}::default::${NEXUS_URL} \
                              -Dusername=${NEXUS_USER} \
                              -Dpassword=${NEXUS_PASS}
                        """
                    }
                    dir('discovery-server') {
                        sh """
                            mvn deploy -DskipTests \
                              -DaltDeploymentRepository=${NEXUS_REPO_ID}::default::${NEXUS_URL} \
                              -Dusername=${NEXUS_USER} \
                              -Dpassword=${NEXUS_PASS}
                        """
                    }
                    dir('api-gateway') {
                        sh """
                            mvn deploy -DskipTests \
                              -DaltDeploymentRepository=${NEXUS_REPO_ID}::default::${NEXUS_URL} \
                              -Dusername=${NEXUS_USER} \
                              -Dpassword=${NEXUS_PASS}
                        """
                    }
                }
            }
        }

        stage('Docker Build and Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'

                    dir('backend') {
                        sh """
                            docker build -t ${DOCKER_HUB_USERNAME}/chat-service:${BUILD_NUMBER} .
                            docker tag ${DOCKER_HUB_USERNAME}/chat-service:${BUILD_NUMBER} \
                                       ${DOCKER_HUB_USERNAME}/chat-service:latest
                            docker push ${DOCKER_HUB_USERNAME}/chat-service:${BUILD_NUMBER}
                            docker push ${DOCKER_HUB_USERNAME}/chat-service:latest
                        """
                    }
                    dir('discovery-server') {
                        sh """
                            docker build -t ${DOCKER_HUB_USERNAME}/discovery-server:${BUILD_NUMBER} .
                            docker tag ${DOCKER_HUB_USERNAME}/discovery-server:${BUILD_NUMBER} \
                                       ${DOCKER_HUB_USERNAME}/discovery-server:latest
                            docker push ${DOCKER_HUB_USERNAME}/discovery-server:${BUILD_NUMBER}
                            docker push ${DOCKER_HUB_USERNAME}/discovery-server:latest
                        """
                    }
                    dir('api-gateway') {
                        sh """
                            docker build -t ${DOCKER_HUB_USERNAME}/api-gateway:${BUILD_NUMBER} .
                            docker tag ${DOCKER_HUB_USERNAME}/api-gateway:${BUILD_NUMBER} \
                                       ${DOCKER_HUB_USERNAME}/api-gateway:latest
                            docker push ${DOCKER_HUB_USERNAME}/api-gateway:${BUILD_NUMBER}
                            docker push ${DOCKER_HUB_USERNAME}/api-gateway:latest
                        """
                    }

                    sh 'docker logout'
                }
            }
        }

        stage('Kubernetes Deploy') {
            steps {
                sh 'kubectl apply -f k8s/namespace.yml'
                sh 'kubectl apply -f k8s/'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed. Check the logs above.'
        }
        always {
            cleanWs()
        }
    }
}
