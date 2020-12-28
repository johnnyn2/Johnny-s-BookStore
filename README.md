# Johnny-s-BookStore
This is a personal project to practice my skills in React, Spring Boot, JPQL, Docker and k8s.

## Deployment
<ol>
  <li>AWS S3(frontend) + AWS ECS(backend)</li>
  <li>AWS S3(frontend) + AWS EC2(backend)</li>
</ol>

## Setup MySQL database container in AWS ECS / Create MySQL database in AWS RDS (for EC2)
<ol>
  <li>Reference: <a href="https://www.youtube.com/watch?v=zJMqCjc2qIc">Spring Boot + Angular + MYSQL on AWS ECS Fargate | AWS ECS Fargate</a></li>
  <li>Reference: <a href="https://www.youtube.com/watch?v=a5yR8wYkggs">Full-Stack Spring Boot with Angular CRUD API application with MYSQL on AWS | AWS EC2 | AWS S3 | RDS</a></li>
</ol>

## Deploy backend api to AWS ECS/EKS</h2>
<ol>
  <li>Modify database link in application.properties to the cloud database link</li>
  <li>Generate .war file: <code>mvn clean install -DskipTests=true</code></li>
  <li>Build an image(<a href="https://hub.docker.com/repository/docker/johnnyhohohohohoho/johnny-bookstore/general">repo here</a>) for the api: <code>docker build -t johnnyhohohohohoho/johnny-bookstore:1.0 .</code></li>
  <li>Push to docker hub: <code>docker push johnnyhohohohohoho/johnny-bookstore:1.0</code></li>
  <li>In AWS ECS, setup container for the backend by coping the image link(docker.io/johnnyhohohohohoho/johnny-bookstore:1.0) in docker hub</li>
  <li>Reference: <a href="https://www.youtube.com/watch?v=zJMqCjc2qIc">Spring Boot + Angular + MYSQL on AWS ECS Fargate | AWS ECS Fargate</a></li>
  <li>Github: <a href="https://github.com/shameed1910/springboot-angular-aws-fargate">shameed1910
/
springboot-angular-aws-fargate</a></li>
</ol>

## Deploy backend api to AWS EC2
<ol>
  <li>Choose an EC2 instance in AWS Management Console</li>
  <li>Store the key-pair for accessing the EC2 instance</li>
  <li>Modify database link in application.properties to the cloud database</li>
  <li>Generate .war file: <code>mvn clean install -DskipTests=true</code></li>
  <li>Build an image(<a href="https://hub.docker.com/repository/docker/johnnyhohohohohoho/johnny-bookstore/general">repo here</a>) for the api: <code>docker build -t johnnyhohohohohoho/johnny-bookstore:1.0 .</code></li>
  <li>Push to docker hub: <code>docker push johnnyhohohohohoho/johnny-bookstore:1.0</code></li>
  <li>Use ssh to connect to the EC2 (the command would be provided by the AWS EC2 setup page)</li>
  <li>Update EC2 instance: <code>sudo yum update -y</code></li>
  <li>Install docker on EC2 instance: <code>sudo yum install -y docker</code></li>
  <li>Start docker: <code>sudo service docker start</code></li>
  <li>Run docker image for your api: <code>docker run -d --name {containerName} -p 8080:8080 johnnyhohohohohoho/johnny-bookstore</code></li>
  <li>Reference: <a href="https://www.youtube.com/watch?v=a5yR8wYkggs">Full-Stack Spring Boot with Angular CRUD API application with MYSQL on AWS | AWS EC2 | AWS S3 | RDS</a></li>
  <li>Github: <a href="https://github.com/shameed1910/springboot-crud-api" >shameed1910
/
springboot-crud-api</a></li>
</ol>

## Deploy frontend React app to AWS S3
<ol>
  <li>Modify the api call url to the cloud api call endpoint</li>
  <li><code>npm install</code></li>
  <li><code>npm run build</code></li>
  <li>upload the content in build folder to the AWS S3 bucket</li>
</ol>

