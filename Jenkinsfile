pipeline {
  agent any

  environment {
    SONARQUBE_ENV = 'sq1' // El nombre que configuraste en "SonarQube Servers"
    TOMCAT_PATH = "C:/Users/Yanca/Documents/Universidad/apache-tomcat-9.0.106/webapps/miapp"
  }

  stages {
    stage('Clonar Repositorio') {
      steps {
        git branch: 'pruebas', url: 'https://github.com/Yankarloz/cypress-prueba.git'
      }
    }

    stage('Instalar Dependencias') {
      steps {
        bat 'npm install'
      }
    }

    stage('Ejecutar Pruebas Cypress') {
      steps {
        bat 'npm run test:e2e'
      }
    }

    stage('Análisis SonarQube') {
      steps {
        withSonarQubeEnv("${env.SONARQUBE_ENV}") {
          withCredentials([string(credentialsId: 'jenkins-sonar', variable: 'jenkins-sonar')]) {
            bat 'npx sonar-scanner -Dsonar.login=%jenkins-sonar%'
          }
        }
      }
    }

    stage('Desplegar en Tomcat') {
    steps {
        // Borrar si ya existe
        bat 'if exist "C:/Users/Yanca/Documents/Universidad/apache-tomcat-9.0.106/webapps/miapp" rmdir /S /Q "C:/Users/Yanca/Documents/Universidad/apache-tomcat-9.0.106/webapps/miapp"'

        // Crear carpeta nueva
        bat 'mkdir "C:/Users/Yanca/Documents/Universidad/apache-tomcat-9.0.106/webapps/miapp"'

        // Copiar contenido de dist/
        bat 'xcopy cypress\\dist "C:/Users/Yanca/Documents/Universidad/apache-tomcat-9.0.106/webapps/miapp" /E /Y /I'
    }
    }

    stage('Notificación Éxito') {
      steps {
        mail to: 'yankaxzuleta@gmail.com',
             subject: "✔️ Pipeline Exitoso: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
             body: "La app fue desplegada correctamente en http://localhost:8081/miapp/"
      }
    }
  }

  post {
    failure {
      mail to: 'yankaxzuleta@gmail.com',
           subject: "❌ Pipeline Fallido: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
           body: "Revisa Jenkins para ver el fallo. Puede haber ocurrido en las pruebas Cypress o análisis SonarQube."
    }
  }
}
