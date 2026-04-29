pipeline {
    agent {
        docker {
            image 'maven:3.9.6-eclipse-temurin-17'
            args '-v /root/.m2:/root/.m2 --network matchy-final_default'
        }
    }

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
                    sh 'mvn sonar:sonar -Dsonar.host.url=http://sonarqube:9000 -Dsonar.token=sqa_5c3abf0262accdd17b993168fad66a44e940da7a'
                }
            }
        }
    }
}