pipeline {
  agent any

  environment {
    DOCKER_HUB_CREDENTIALS = 'dockerhub-id'         // Docker Hub username/password
    SSH_CREDENTIALS = 'ec2-ssh-id'                  // EC2 SSH Key (PEM)
    IMAGE_TAG = "latest"
    DOCKERHUB_USERNAME = "macikel"
    GIT_REPO = "https://github.com/MAcikel/laravel-node-deploy.git"
    EC2_PUBLIC_IP = "54.237.65.32"
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
          withCredentials([usernamePassword(credentialsId: DOCKER_HUB_CREDENTIALS, passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
            sh """
              docker build -t ${DOCKERHUB_USERNAME}/backend:${IMAGE_TAG} ./backend
              docker build -t ${DOCKERHUB_USERNAME}/frontend:${IMAGE_TAG} ./frontend

              echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USERNAME --password-stdin

              docker push ${DOCKERHUB_USERNAME}/backend:${IMAGE_TAG}
              docker push ${DOCKERHUB_USERNAME}/frontend:${IMAGE_TAG}
            """
          }
        }
      }
    }

    stage('Deploy to EC2') {
      steps {
        sshagent(credentials: [SSH_CREDENTIALS]) {
          sh """
            ssh -o StrictHostKeyChecking=no ec2-user@${EC2_PUBLIC_IP} "docker pull ${DOCKERHUB_USERNAME}/backend:${IMAGE_TAG}"
            ssh -o StrictHostKeyChecking=no ec2-user@${EC2_PUBLIC_IP} "docker pull ${DOCKERHUB_USERNAME}/frontend:${IMAGE_TAG}"
            ssh -o StrictHostKeyChecking=no ec2-user@${EC2_PUBLIC_IP} "docker-compose -f /home/ec2-user/docker-compose.yml down"
            ssh -o StrictHostKeyChecking=no ec2-user@${EC2_PUBLIC_IP} "docker-compose -f /home/ec2-user/docker-compose.yml up -d"
          """
        }
      }
    }
  }
}
