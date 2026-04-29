pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                dir('profile_project_service') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Test') {
            steps {
                dir('profile_project_service') {
                    sh 'mvn test -Dtest="MatchingServiceTest"'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                dir('profile_project_service') {
                    sh 'mvn sonar:sonar -Dsonar.host.url=http://sonarqube:9000'
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t matchy-profile-service ./profile_project_service'
            }
        }
    }
}