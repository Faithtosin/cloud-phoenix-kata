# Stack

This project was developed with **AWS services** and **MongoDB Atlas**. The infrastructure was written as code using Cloudformation. 

# DESCRIPTION
To successfully deploy this cloudformation stack, some requirements need to met.

* ***GithubToken*** : personal access token needs to be generated. follow the steps [here](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token). Can be injested into secrets manager for security purposes.
* ***Networking requirements***: The Network Access Control List (**NACL**)  and Security Group (**SG**) manages networking access to AWS resources. I have skipped the automation of the creation of network related resources. Different AWS accounts have different networking configurations, the user should fully understand the implication of the resources being created.  Check Cloudformation parameter description to understand the requirement from each networking parameter.
* ***SNS Topic***:  Subscription Confirmation for the SNS topic created by the cloudformation stack

*NOTE: Details and description of each cloudformation parameter can be found in each parameter's description property.*



#### Application Requirements

-   Runs on Node.js 8.11.1 LTS : The dockerfile uses Node.js 8.11.1
-   MongoDB as Database: I have opted for a fully managed mongodb service **MongoDB Atlas**. Of all numerous reason why I made this decision, using this service allows me to focus on infrastructure & application deployment. It also manages database administration tasks on my behalf.
-   Environment variables: All environmental variables are securely declared in the cloudformation script, and injected to the docker image by **AWS Codebuild** at build step.

#### Problem Requirements

 -   Automation of infrastructure creation and application setup:   Creation of the cloudformation stack, automatically creates the application environment and starts the CI/CD pipeline (AWS CodePipeline), and deploys the application automatically. Each merger/commit  to the specified branch triggers the pipeline.

 -  Recovery from crashes:  The application is containerized (**AWS ECS Fargate**). Containers are architected for high availabilty. At every crash, the **ECS service** restarts the container from the declared **Task definition**. The Application load balancer also performs health checks on the container to ensure high availabilty.
 -  Application and database logs rotation of 7 days: Application and database logs are managed by **AWS Cloudwatch Logs** and **MongoDB Atlas** respectively. Log retention has been set to 7 days on both services.
 -  Notify any CPU peak: The infrasructure creates an AWS Cloudwatch Alarm (it goes off when maximum CPUutilization is above 80% for any 1 minute period) then a SNS topic is triggered to send a mail to the specified Email address .
 -  CI/CD pipeline for the code: The pipeline uses Github (source control), AWS CodePipeline, AWS Codebuild and AWS CodeDeploy for continous delivery and continous deployment. The pipeline is triggered by any Merge/commit action to the declared branch.
 -  AutoScaling when the number of request are greater than 10 req /sec: The infrasructure also creates an AWS Cloudwatch Alarm (goes off when the sum of requests are more than 600 req/60seconds period, equivalent to 10 req /sec) then ECS service autoscaling policy is triggered to add a container. This continues until the target req/sec is met or specified max container number is met. Minimum evaluation period supported for free by cloudwatch alarm is 60 seconds.


<a href="https://ibb.co/hWMXYr4"><img src="https://i.ibb.co/jM5VJqQ/ci-cd-Diagram22.jpg" alt="CI/CD Pipeline" border="0"></a>

## How to deploy
To deploy the application:
 1. Got to the cloudformation service on the AWS console
 2. Upload the cloudformation-stack.yaml file
 3. Fill in all the neccesary cloudformation parameters. and create stack

AWS Codepipeline automatically kicks in after the stack creation, and the application is deployed. 

> The stack can also be created using the **AWS CLI**. 
> 
>     aws cloudformation create-stack --stack-name myteststack --template-body file://cloudformation-stack.yaml --parameters ParameterKey=ENV,ParameterValue=development ParameterKey=AlertDestinationEmail,ParameterValue=******@gmail.com ..........
> 
> But using the AWS CLI  requires additional configuration.

To access the application, check the **Application Load Balancer**  endpoint, generated in the output tab after stack creation. Deployment process takes about 5-10 min to be completed.


```
