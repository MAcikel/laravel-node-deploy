pipeline {
  agent any

  environment {
    DOCKER_HUB_CREDENTIALS = 'dockerhub-id'         // Jenkins -> Credentials ID
    SSH_CREDENTIALS = 'ec2-ssh-id'                  // Jenkins -> EC2 SSH Key ID
    IMAGE_TAG = "latest"
    DOCKERHUB_USERNAME = "macikel"
    GIT_REPO = "https://github.com/MAcikel/laravel-node-deploy.git"
  }

  stages {
    stage('Clone') {
      steps {
        git url: "${GIT_REPO}", branch: 'main', credentialsId: 'github-pat'
      }
    }

    stage('Build & Push Images') {
      steps {
        script {
          sh 'docker build -t macikel/backend:latest ./backend'
          sh 'docker build -t macikel/frontend:latest ./frontend'

          withCredentials([usernamePassword(credentialsId: DOCKER_HUB_CREDENTIALS, passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
            sh """
              echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USERNAME --password-stdin
              docker push macikel/backend:latest
              docker push macikel/frontend:latest
            """
          }
        }
      }
    }

    stage('Deploy to EC2') {
      steps {
        sshagent(credentials: [SSH_CREDENTIALS]) {
          sh '''
            ssh -o StrictHostKeyChecking=no ec2-user@EC2_PUBLIC_IP <<EOF
              docker pull macikel/backend:latest
              docker pull macikel/frontend:latest
              docker-compose -f /home/ec2-user/docker-compose.yml down
              docker-compose -f /home/ec2-user/docker-compose.yml up -d
            EOF
          '''
        }
      }
    }
  }
}
