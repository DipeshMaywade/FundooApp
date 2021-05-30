# **FundooNotes (similar as Google Keep Backend)**

<br>

## **Contribution**

> When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners(**[Dipesh Maywade](dipeshmaywade@gmail.com)**) of this repository before making a change

## **Author**

> #### Dipesh Maywade

## **Description**

> ### This project's backend is developed as similar of **[Google Keep](https://keep.google.com/)** aplication's backend.

## Project Setup Steps

> ### Step1:
>
> Clone the repository in your system using this command "git clone https://github.com/DipeshMaywade/FundooApp"

> ### Step2:
>
> Install given npm packages which is required using "npm install" command.

> ### Step3:
>
> setup .env file according to sample file and run project using "npm start" command.

## **Prerequisites**

**Language and version**

> - Java-Script ES-6.
> - NodeJS(Run time enviroment) v14.15.3.
> - npm v7.10.0

**Required application**

> - **[Visual Studio Code](https://www.youtube.com/watch?v=MlIzFUI1QGA)**(Code Editor IDE)
> - **[MongoDB Compass](https://www.youtube.com/watch?v=FwMwO8pXfq0)**(Database and UI)
> - **[Redis](https://www.youtube.com/watch?v=188Fy-oCw4w)**(For Caching)
> - **[RabbitMQ](https://www.youtube.com/watch?v=V9DWKbalbWQ)**(For mail sending in queue)
> - **[GraphiQL](https://www.electronjs.org/apps/graphiql)**(For Testing)
> - **[Postman](https://www.youtube.com/watch?v=MCPdfuzmyxY)**(For Testing)

### Dependencies that are needed to be installed

> - "bcrypt": "^5.0.1"
> - "bluebird": "^3.5.1"
> - "dotenv": "^8.2.0"
> - "ejs": "^3.1.6"
> - "express": "^4.17.1"
> - "express-graphql": "^0.12.0"
> - "graphql": "^15.5.0"
> - "joi": "^17.4.0"
> - "jsonwebtoken": "^8.5.1"
> - "mongodb": "^3.6.6"
> - "mongoose": "^5.12.5"
> - "nodemailer": "^6.6.0"
> - "winston": "^3.3.3"
> - "eslint": "^6.8.0"
> - "redis": "^3.1.2",
> - "amqplib": "^0.7.1",

### Short description about installed npm packages.

**bcrypt**

> **[Bcrypt](https://www.npmjs.com/package/bcrypt)** is a password-hashing function. Besides incorporating a salt to protect against rainbow table attacks, bcrypt is an adaptive function: over time, the iteration count can be increased to make it slower, so it remains resistant to brute-force search attacks even with increasing computation power.

**bluebird**

> **[Bluebird](https://www.npmjs.com/package/bluebird)** is a fully featured promise library with focus on innovative features and performance.

**dotenv**

> **[Dotenv](https://www.npmjs.com/package/dotenv)** is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

**express**

> **[Express](https://www.npmjs.com/package/express)** The Express philosophy is to provide small, robust tooling for HTTP servers, making it a great solution for single page applications, web sites, hybrids, or public HTTP APIs.

**express-graphql**

> **[Express-Graphql](https://www.npmjs.com/package/express-graphql)** GraphQL has become an immensely popular alternative to REST APIs. The flexibility you get from using GraphQL makes it easier for developers to get any information they need for an app, and just the information they need for that portion of the app.

**graphql**

> **[Graphql](https://www.npmjs.com/package/graphql)** The JavaScript reference implementation for GraphQL, a query language for APIs created by Facebook. GraphQL lets you ask for what you want in a single query, saving bandwidth and reducing waterfall requests. It also enables clients to request their own unique data specifications.

**joi**

> **[Joi](https://www.npmjs.com/package/joi)** The most powerful schema description language and data validator for JavaScript.

**jsonwebtoken**

> **[Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)** Information Exchange: JWTs are a good way of securely transmitting information between parties because they can be signed, which means you can be sure that the senders are who they say they are. Additionally, the structure of a JWT allows you to verify that the content hasn't been tampered with.

**mongodb**

> **[Mongodb](https://www.npmjs.com/package/mongodb)** The official MongoDB Node.js driver allows Node.js applications to connect to MongoDB and work with data. The driver features an asynchronous API which allows you to interact with MongoDB using Promises or via traditional callbacks.

**mongoose**

> **[Mongoose](https://www.npmjs.com/package/mongoose)** is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.

**nodemailer**

> **[Nodemailer](https://www.npmjs.com/package/nodemailer)** is a Node. js module that allows you to send emails from your server with ease. Whether you want to communicate with your users or just notify yourself when something has gone wrong, one of the options for doing so is through mail.

**redis**

> **[Redis](https://www.npmjs.com/package/redis)** is an open source (BSD licensed), in-memory data structure store, used as a database, cache, and message broker. Redis provides data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, geospatial indexes, and streams.

**amqplib**

> **[amqplib](https://www.npmjs.com/package/amqplib)** is an application layer protocol that lets client applications talk to the server and interact. However, AMQP should not just be considered a protocol used for over-the-wire communication; AMQP defines both the network layer protocol and a high-level architecture for message brokers.

**aws-sdk**

> **[aws-sdk](https://www.npmjs.com/package/aws-sdk)** The AWS SDK for JavaScript v3 API Reference Guide provides a JavaScript API for AWS services. You can use the JavaScript API to build libraries or applications for Node.js or the browser.

## FundooNotes Production Documentation

### Application deployment on AWS EC2 Instance With Jenkins

> - Log into your AWS console search for and select EC2
> - You have to create two instances for jenkins and your app server separately.
> - Beginning with creating a jenkins server.
> - Select Launch Instance
> - Choose Ubuntu Server 16.04 LTS (HVM), SSD Volume Type. Select the free tiered Ubuntu Server 16.04 LTS
> - Choose an Instance Type and choose next.
> - Configure Security Group and choose Create a new security group
> - Confirm that port 22 is configured to allow access to your VM and also add a new security group choose custom tcp rule and set the port range to 8080 and next type 0.0.0.0/0 in source.
> - Finally review and launch.
> - After you select Launch you will be prompted to Select an existing key pair or to create one.
> - Create a new key pair and download it.
> - Now open the terminal and go to the folder you have downloaded the key pair and connect to the instance by firing the commands which is mentioned.
> - Install Java : https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-get-on-ubuntu-16-04
> - Go through this link and install jenkins : https://medium.com/@Marklon/how-to-install-jenkins-on-ubuntu-16-04-on-aws-e584c45c2684
> - Check the status and configure the firewall settings.
> - Once you've logged in click on new item and type the name of your jenkins project and choose freestyle project.
> - In the general option select GitHub project and paste the URL of your GitHub repository.
> - Under the source code management choose git and paste the URL of your github repository.
> - Under build triggers choose GitHub hook trigger for GITScm polling.
> - Under build choose execute shell and write the script
> - Apply and save.
> - Go to your GitHub and open the settings of the repository you want to deploy and click on webhooks and then add webhook, in the payload URL type http://yourJenkinsPublicIP:8080/github-webhook/ and then click on add webhook. If it shows a green tick the webhook has been added successfully.
> - Go to Jenkins and then go to the project and click on build now. It'll show a blue indication if it's successful.
> - Now we have to integrate the jenkins and the node app servers.
> - Connect to the instances on separate terminals.
> - SSH to jenkins (in the jenkins terminal)

       * Switch to Jenkins user -  sudo su Jenkins
       * Generate ssh key -  ssh-keygen -t rsa
       * Save the generated key in /var/lib/jenkins/.ssh/id_rsa
       * Leave the passphrase empty
       * Print the SSH key you just created -  cat ~/.ssh/id_rsa.pub
       * Copy this Key

> - SSH to your app server

       • Open the file where authorized keys are stored -
          nano ~/.ssh/authorized_keys
       • Paste the key which you copied
         (Ctrl+S and then Ctrl+X then Y then Enter)

> - To check whether your Jenkins server already has SSH access to node-app server without entering a password. Run these command:
>   sudo su - jenkins
>   ssh ubuntu@NODE.APP.SERVER.PRIVATE.IP
> - Copy your project from jenkins workspace to app server by the following command in the jenkins terminal:
>   sudo su jenkins
>   scp -r /var/lib/jenkins/workspace/{nameOfYourProject} ubuntu@NODE.SERVER.PRIVATE.IP:/home/ubuntu
> - ssh into app server and check if your project has been copied by running the command ls
> - Once it's copied Install all the necessary things like node,npm,mongoDb,redis etc and then go to your project directory and create the .env and later install all the dependencies by running "npm i"
> - Start your server
> - Type the public ip of your appServer followed by the port number of your app and check if it has been deployed.

> - Check the following links :
>   https://medium.com/konvergen/jenkins-for-node-js-app-on-aws-ec2-part-1-installing-jenkins-on-ec2-24675cc08998 > > https://medium.com/konvergen/jenkins-for-node-js-app-on-aws-ec2-part-2-creating-a-node-js-app-3a0fb6b63bc7 > > https://medium.com/konvergen/jenkins-for-node-js-app-on-aws-ec2-part-3-jenkins-node-js-app-integration-1fa9d1306d25
