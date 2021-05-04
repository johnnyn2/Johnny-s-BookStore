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

## Deploy backend api to AWS ECS</h2>
<ol>
  <li>Create MySQL database container in ECS Fargate task</li>
  <li>Modify database link in application.properties to the previous created MySQL endpoint</li>
  <li>Generate .war file: <code>mvn clean install -DskipTests=true</code></li>
  <li>Build an image(<a href="https://hub.docker.com/repository/docker/johnnyhohohohohoho/johnny-bookstore/general">repo here</a>) for the api: <code>docker build -t johnnyhohohohohoho/johnny-bookstore:1.0 .</code></li>
  <li>Push to docker hub: <code>docker push johnnyhohohohohoho/johnny-bookstore:1.0</code> or AWS ECR</li>
  <li>In AWS ECS, setup container for the backend by coping the image link(docker.io/johnnyhohohohohoho/johnny-bookstore:1.0) in docker hub</li>
  <li>For the React frontend, modify the request endpoint and build a docker image for it</li>
  <li>Push the frontend image to docker hub or ECR</li>
  <li>In AWS ECS, setup container for the frontend image</li>
  <li>Reference: <a href="https://www.youtube.com/watch?v=zJMqCjc2qIc">Spring Boot + Angular + MYSQL on AWS ECS Fargate | AWS ECS Fargate</a></li>
  <li>Github: <a href="https://github.com/shameed1910/springboot-angular-aws-fargate">shameed1910
/
springboot-angular-aws-fargate</a></li>
</ol>

## Deploy backend api to AWS EC2
<ol>
  <li>Choose an AMI (Amazon Machine Image) for EC2 instance in AWS Management Console</li>
  <li>Choose EC2 instance type</li>
  <li>In security group section, click Add Rule button to add a rule allow TCP traffic on port 8080</li>
  <li>Store the key-pair .pem for accessing the EC2 instance</li>
  <li>Modify database link in application.properties to the cloud database. A better way is to separate  *-dev.properties and *-prod.properties file for different database enpoints</li>
  <li>Generate .war file: <code>mvn clean install -DskipTests=true</code> or generate .jar file by <code>./gradlew bootJar</code></li>
  <li>Create a deploy.sh file to copy the executable jar/war to the ec2 using the .pem file to connect to ec2</li>
  <li>Include ssh command to connect to the EC2 (the command would be provided by the AWS EC2 setup page) in deploy.sh</li>
  <li>Kill the previous running process</li>
  <li>Restart the updated project by <code>java -jar xxxx-SNAPSHOOT.jar / xxxx-SNAPSHOOT.war</code></li>
  <li>
    Reference: 
    <a href="https://medium.com/@kgaurav23/deploying-hosting-spring-boot-applications-on-aws-ec2-7babc15a1ab6">Deploying/Hosting Spring Boot Applications on AWS EC2</a>
  </li>
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
  <li>In the bucket Properties section, choose "Static website hosting" and save</li>
</ol>

