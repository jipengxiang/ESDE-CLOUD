         ___        ______     ____ _                 _  ___  
        / \ \      / / ___|   / ___| | ___  _   _  __| |/ _ \ 
       / _ \ \ /\ / /\___ \  | |   | |/ _ \| | | |/ _` | (_) |
      / ___ \ V  V /  ___) | | |___| | (_) | |_| | (_| |\__, |
     /_/   \_\_/\_/  |____/   \____|_|\___/ \__,_|\__,_|  /_/ 
 ----------------------------------------------------------------- 


Hi there! Welcome to AWS Cloud9!

To get started, create some files, play with the terminal,
or visit https://docs.aws.amazon.com/console/cloud9/ for our documentation.

Happy coding!

Lab 5: Developing with AWS Lambda and Amazon API Gateway using the AWS Software Development Kit (AWS SDK)
Overview

In this lab, you will learn how to develop with AWS Lambda and Amazon API Gateway by using one of the AWS software development kits (SDKs): the AWS SDK for JavaScript in Node.js, the AWS SDK for Ruby, or the AWS SDK for Python (Boto). You can select the development language you are most comfortable with (Node.js, Ruby, or Python). Following the provided scenario, you will enhance the functionality of the website that you created in Lab 2 and the database that you created in Lab 3 by using AWS Lambda fronted by Amazon API Gateway. This lab gives you hands-on experience with Amazon API Gateway, AWS Lambda, and AWS Cloud9.

Objectives

After completing this lab, you will be able to:

Create a simple REST API mock endpoint and connect it to your website.
Enable Cross-Origin Resource Sharing (CORS) on your website.
Create a Lambda function that queries your database.
Call your deployment package and configure your Lambda function.
Replace your mock endpoint with your Lambda function.
After you complete this lab, you should have a fully working serverless website that queries your cat database and displays cat information by breed.

Duration

This lab requires approximately 180 minutes to complete.

Scenario

One morning you wake up surrounded by cats. You decide it's time to get all your cat data live on the internet and start finding owners for all your feline friends. Your lost cat website helped you find Puddles Gordie's owners, so you think it will also help you find owners for all the other cats.

After you feed the cats, you open your computer and start coding an application programing interface (API) that will allow your website to display information on all the cats you found.

You think it would be useful for people to search by cat breed, so you edit your website and re-upload it to Amazon Simple Storage Service (Amazon S3). You start thinking about how to create your API endpoint.

You want to use AWS Lambda and Amazon API Gateway to build a serverless application.

Here is the list of tasks that you will need to perform:

Create a simple REST API mock endpoint and connect it to your website.
Enable Cross-Origin Resource Sharing (CORS).
Create a Lambda function that queries your database.
Call your deployment package and configure your Lambda function
Replace your mock endpoint with your Lambda function.
Accessing the AWS Management Console
At the top of these instructions, click Start Lab to launch your lab.
A Start Lab panel opens displaying the lab status.
Wait until you see the message "Lab status: ready", then click the X to close the Start Lab panel.
At the top of these instructions, click AWS
This will open the AWS Management Console in a new browser tab. The system will automatically log you in.

TIP: If a new browser tab does not open, there will typically be a banner or icon at the top of your browser indicating that your browser is preventing the site from opening pop-up windows. Click on the banner or icon and choose "Allow pop ups."

Arrange the AWS Management Console tab so that it displays along side these instructions. Ideally, you will be able to see both browser tabs at the same time, to make it easier to follow the lab steps.

 

Task 1: Prepare the Lab
Before you can start this lab, you need to import some files and install some packages in the AWS Cloud9 environment that was prepared for you.

From the AWS Management Console, go to the Services menu and choose Cloud9.
To open the AWS Cloud9 environment you are provided, choose Open IDE.
To seed your AWS Cloud9 filesystem, go to the AWS Cloud9 bash terminal (at the bottom of the page) and run the following wget command:
wget https://aws-tc-largeobjects.s3-us-west-2.amazonaws.com/DEV-ILT-TF-200-ACCDEV-1/lab-5-lambda-gateway.zip -P /home/ec2-user/environment
You should see that a lab-5-lambda-gateway.zip file has been added to the root folder in your AWS Cloud9 filesystem (on the top left).

To unzip the lab-5-lambda-gateway.zip file, run the following command:
unzip lab-5-lambda-gateway.zip
This process might take a few moments. In your AWS Cloud9 filesystem, you should now see different language folders within the lab root folder.

To clean up your environment, remove the .zip and README files by running the following commands:
rm *.zip
rm README.md
Decide what language you will work in. (Currently, your choices are Node.js, Ruby, and Python.)
Expand the folder for your language of choice by selecting the black arrow next to the folder. Notice that there is a solution folder. Throughout this lab, don't look at the solution unless you can't figure out how to complete the task on your own. Always try to code first.
To set the terminal path to the correct folder for the language you chose, run the following command:
cd <your choice of language folder>
# e.g cd python_3.6.8
For any coding you do, you will work inside that <your choice of language> folder.

Confirm that you are in the correct folder in the AWS Cloud9 terminal.
Find the One-Time Initialization and Import command for your language of choice in the following table, and run it in the AWS Cloud9 terminal.
Note: Different languages require different steps to initialize the code environment.

Language	One-Time Initialization and Import
Node.js (8.10.0)	npm install aws-sdk
Ruby (2.6.0)	gem install aws-sdk #this may take around 3 minutes
Python (3.6.8)	wget https://aws-tc-largeobjects.s3-us-west-2.amazonaws.com/ILT-TF-200-ACCDEV-1/update_python.sh
. ./update_python.sh
You should see that some packages and modules were installed.

Ignore any warnings in the terminal. However, if you get an error, speak to your instructor before you move on.

You are now ready to do the lab tasks with the SDK.

Task 2: Create a Simple REST API Mock Endpoint
Inspect Your Amazon S3 Website
This lab uses a modified version of your Amazon S3 web application, which includes JavaScript and CSS. To see your modified Amazon S3 website, do the following steps:

At the top of these instructions, click Details, and then next to AWS: click Show.
In the Credentials window that opens, scroll down and copy the WebsiteURL.
Paste the URL in a new browser window.
When the page loads, it will try to search for all cats. However, the page displays an error: No API to call. This behavior is expected because your website is not yet connected to a backend API.

Your next task is to create a mock API using Amazon API Gateway.

Create a REST Endpoint with Amazon API Gateway
In this task, you will create a REST API from the Amazon API Gateway console. You will also test your API by configuring a mock integration to generate API responses from API Gateway directly, without needing an integration backend. Finally, you will publish your REST API.

To create and test a REST API from the Amazon API Gateway console, do the following:

From the AWS Management Console, choose API Gateway. You are now in the Amazon API Gateway console.

If prompted, choose Get Started.

Under Choose an API type, scroll down to the REST API section.

Choose Build.

In the Create your first API window, choose OK.

Under Create new API, select New API.

For Settings, use these settings:

API name: CatSearch
Description: Add a brief description (optional).
Endpoint Type: Regional
Choose Create API.

Choose Actions and then Create Method.

Under Resources, go to the dropdown menu under the /, choose POST, and choose the check mark icon.

For Integration type, choose Mock and then choose Save.

Choose TEST.

Scroll down. Under Request Body, enter the following JSON:

{
    "breed_str": "Scottish Fold"
}
Choose Test.
You should see the following information:

Under Response Body:
no data
Under Response Headers:
{
    "Content-Type": "application/json"
}
Logs should look similar to:
Execution log for request 7432445d-65c3-11e9-a518-43356d702d8d
Tue Apr 23 12:29:35 UTC 2019 : Starting execution for request: 7432445d-65c3-11e9-a518-43356d702d8d
Tue Apr 23 12:29:35 UTC 2019 : HTTP Method: POST, Resource Path: /
Tue Apr 23 12:29:35 UTC 2019 : Method request path: {}
Tue Apr 23 12:29:35 UTC 2019 : Method request query string: {}
Tue Apr 23 12:29:35 UTC 2019 : Method request headers: {}
Tue Apr 23 12:29:35 UTC 2019 : Method request body before transformations: {
    "breed_str": "Scottish Fold"
}
Tue Apr 23 12:29:35 UTC 2019 : Method response body after transformations: 
Tue Apr 23 12:29:35 UTC 2019 : Method response headers: {Content-Type=application/json}
Tue Apr 23 12:29:35 UTC 2019 : Successfully completed execution
Tue Apr 23 12:29:35 UTC 2019 : Method completed with status: 200
The test is returning information successfully, though without any values. You want to create a mock API test and return some static values. You will create a mock API endpoint that always returns two cat items, which you will hardcode in to the API's response. The API will return these items like they came from an Amazon DynamoDB response. You will let your client-side web application handle formatting directly in the website's JavaScript code.

To go back to the test settings, scroll up and choose Method Execution.
Choose Integration Response.
To show the response properties, choose the arrow.
Choose the arrow for Mapping Templates.
Under Content-Type, select application/json.
For General template, select Method Request passthrough.
Replace all the lines with the following JSON:
[
  {
    "petname": {
      "S": "Natalia"
    },
    "data_found": {
      "S": "2019-01-02TT17:19:52.608Z"
    },
    "breed": {
      "S": "Russian Blue"
    },
    "gender": {
      "S": "Female"
    },
    "notable_features": {
      "S": "Short tail"
    }
  },
  {
    "petname": {
      "S": "Puddles"
    },
    "data_found": {
      "S": "2019-01-02TT17:19:52.608Z"
    },
    "breed": {
      "S": "Russian Blue"
    },
    "gender": {
      "S": "Male"
    },
    "notable_features": {
      "S": "Cut on right ear"
    }
  }
]
At the bottom of the Mapping Templates section, choose Save.
At the top of the page, choose Save.
Scroll back to the top and choose Method Execution again.
Choose TEST.
Set the request body as:
 {
    "breed_str": "Scottish Fold"
 }
Choose Test.
You should see the following information:

Under Response Body:
[
  {
    "petname": {
      "S": "Natalia"
    },
    "data_found": {
      "S": "2019-01-02TT17:19:52.608Z"
    },
    "breed": {
      "S": "Russian Blue"
    },
    "gender": {
      "S": "Female"
    },
    "notable_features": {
      "S": "Short tail"
    }
  },
  {
    "petname": {
      "S": "Puddles"
    },
    "data_found": {
      "S": "2019-01-02TT17:19:52.608Z"
    },
    "breed": {
      "S": "Russian Blue"
    },
    "gender": {
      "S": "Male"
    },
    "notable_features": {
      "S": "Cut on right ear"
    }
  }
]
Under Response Headers:
{"Content-Type":"application/json"}
Logs should look similar to:
Execution log for request c61eef74-6600-11e9-9f09-b5126932d0d6
Tue Apr 23 19:48:32 UTC 2019 : Starting execution for request: c61eef74-6600-11e9-9f09-b5126932d0d6
Tue Apr 23 19:48:32 UTC 2019 : HTTP Method: POST, Resource Path: /
Tue Apr 23 19:48:32 UTC 2019 : Method request path: {}
Tue Apr 23 19:48:32 UTC 2019 : Method request query string: {}
Tue Apr 23 19:48:32 UTC 2019 : Method request headers: {}
Tue Apr 23 19:48:32 UTC 2019 : Method request body before transformations:  {
    "breed_str": "Scottish Fold"
 }
Tue Apr 23 19:48:32 UTC 2019 : Method response body after transformations:
[
  {
    "petname": {
      "S": "Natalia"
    },
    "data_found": {
      "S": "2019-01-02TT17:19:52.608Z"
    },
    "breed": {
      "S": "Russian Blue"
    },
    "gender": {
      "S": "Female"
    },
    "notable_features": {
      "S": "Short tail"
    }
  },
  {
    "petname": {
      "S": "Puddles"
    },
    "data_found": {
      "S": "2019-01-02TT17:19:52.608Z"
    },
    "breed": {
      "S": "Russian Blue"
    },
    "gender": {
      "S": "Male"
    },
    "notable_features": {
      "S": "Cut on right ear"
    }
  }
]
Tue Apr 23 19:48:32 UTC 2019 : Method response headers: {Content-Type=application/json}
Tue Apr 23 19:48:32 UTC 2019 : Successfully completed execution
Tue Apr 23 19:48:32 UTC 2019 : Method completed with status: 200
You have now created and tested your REST API. Next, you must publish it:

Choose Actions and under API Actions, select Deploy API.
On the Deploy API window:
Deployment stage: Select [New Stage].
Stage name: Enter Prod.
Stage description: Enter Prod.
Deployment description: Leave this box blank.
Choose Deploy. (Ignore any warnings.)
Congratulations! You have completed this task. You should now have a URL in your CatSearch API dashboard that looks like this example:

https://xxxxxxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod
Task 3: Connect the New API (Mock) Endpoint to Your Website
Now that you have created your new API endpoint, you will reference it in your website to make your website dynamic.

Update a Config File to Point to New API (Mock) Endpoint
Currently, your website has the following in a config.js file:

var API_ENDPOINT_STR = "<FMI>";
You must edit this website configuration (config) file to point to your new API (mock) endpoint.

In your AWS Cloud9 development environment, do the following:

In your AWS Cloud9 filesystem, notice that there is a folder called resources. This folder has three files: cat_data.json, config.js, and seed.js. In the resources folder, open (double-click) the file called config.js.
In the file, replace the <Fill Me In> or <FMI> with your API endpoint, which should be enclosed in double quotation marks, like this example:
var API_ENDPOINT_STR =  "https://xxxxxxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod"
Similarly, replace the <Fill Me In> or <FMI> with the correct value in other parts of the lab.
Save the config.js file.
Find Your S3 Bucket Name
In the next task, you will write some code to upload the config file to an S3 bucket that was created for you in the US East (N. Virginia) Region. In this code, you will include the name of your S3 bucket.

To find the name of your S3 bucket, go to the AWS Cloud9 terminal and enter the following command:
aws s3 ls | grep s3bucket
The command should return the name of your S3 bucket, which contains s3bucket.

lab-5-step-49-s3-bucket-name

Copy the bucket name. Note that the date appears before the bucket name, so make sure that you copy only the bucket name.
Write Some Code to Upload the Config File to an S3 Bucket
First, you must check the AWS SDK Documentation to recall how to upload an item to your S3 bucket.

From the following table, open the link to the method for uploading items in the AWS SDK documentation for the language you want to code in.
Check the method name and establish what parameters you must pass in.
Language	AWS SDK Documentation deep link
Node.js (8.10.0)	https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
Ruby (2.6.0)	https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/S3/Client.html#put_object-instance_method
Python (3.6.8)	https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html#S3.Client.upload_file
From your AWS Cloud9 environment, navigate to your code folder (Node.js,. Python, or Ruby) and do the following:

In the code folder you are working from, open (double-click) the upload_items file.
Using the AWS SDK documentation for reference, replace the <Fill Me In> or <FMI> sections of the code in that file so that the code uploads the config file to your S3 bucket.
The solution file is available if you cannot complete these steps, but try to code first before you look at the solution.

Save the file.
In the AWS Cloud9 terminal, run this file by using the run command for the language you chose, which is listed in the following table.
Language	Run Command
Node.js (8.10.0)	node upload_items.js
Ruby (2.6.0)	ruby upload_items.rb
Python (3.6.8)	python36 upload_items.py
Confirm That Your Code Works
Navigate back to your Amazon S3 website.
When the webpage opens, it will start to query for all cats. However, you will notice a new error message: Failed due to CORS.

You do some research and find out that you are getting this error because your browser is enforcing a cross-domain policy rule.

Fortunately, this issue can be fixed quickly.

If you can't complete these steps, or if your code doesn't work, refer to the solution code.

Congratulations! You have completed this task. You created, tested, and published a REST API. You also connected the endpoint to your S3 website.

Task 4: Enable CORS on Your Endpoint
Your website is hosted in one domain (your Amazon S3 website URL) and your API is hosted in a different domain (the Amazon API Gateway endpoint URL). Your browser doesn't like this situation and blocks the request.

You must let your browser know that it is OK to call your API Gateway endpoint URL from your website. You do this by using what is known as a preflight request.

This entire process of allowing cross-domain access with preflight requests is called enabling CORS, or Cross-Origin Resource Sharing.

To enable CORS from the Amazon API Gateway console, do the following:

Navigate to the Amazon API gateway console and view your CatSearch API.
In the left navigation pane, go to Resources.
Above POST, choose the resource /.
Choose Actions and select Enable CORS.
Select the top two check boxes for DEFAULT 4XX and DEFAULT 5XX.
Leave the other settings at their default settings.
Choose Enable CORS and replace existing CORS headers.
Choose Yes, replace existing values.
Choose Actions and then choose Deploy API.
For Deployment stage, select Prod.
Choose Deploy to deploy to your prod stage. (Ignore any warnings.)
Confirm That It Works
To confirm whether you successfully enabled CORS, navigate back to your Amazon S3 website and refresh the page.
It can take a few moments (usually less than a minute) for the changes you just made to propagate, so you may need to refresh the page a few times.

If you successfully enabled CORS, you should see information for two cats. This means that your Amazon S3 website called your API endpoint and got a response from it.

Congratulations! You have completed this task. You enabled CORS so that your Amazon S3 website can call your API endpoint.

Try searching for a cat breed (but do not search for all).
You notice that no matter what you search for, you always get the same response (that is, you always get the same two cats). This response is expected, as you have only created a mock (or fake) endpoint.

Now that you have the API backend connected to your application, it is time to create a function that queries your database for cat information based on breed, and link that function to your API Gateway instead of the mock endpoint.

You must complete two more tasks in this lab:

Create a Lambda function that queries DynamoDB (and test it).
Exchange the mock endpoint for the Lambda function endpoint and test it on your website.
Pre-task: Populate the Database
Before you can move on to the next task of creating a Lambda function that queries your lostcats database, you must seed the database with some cat data.

A script is provided for you, which you will run to seed your database. Follow these steps carefully to seed your database so that you can complete the rest of the lab:

In the AWS Cloud9 terminal, navigate to the resources folder. Because you should already be in a code folder, you can navigate to the resources folder by running these commands:
   cd ..
   cd resources
Note: You may need to press enter again.

Confirm that you are in the correct folder: ~/environment/resources.
Run the following command:
   npm install aws-sdk
Note: npm is the Node.js package manager. You must run this command regardless of the SDK you chose to use. You might already have npm installed if you chose Node.js as your language. Installing it twice is harmless, so you can ignore any warnings.

Now run the following command:
   node seed.js
You should see OK.

Go to the Amazon DynamoDB console and confirm that you have a table with some cat items. (You might need to refresh the page.) You should see this:
1556552117344

You must now navigate back to the code folder you were previously working in.

To navigate back to the root folder, go to the AWS Cloud9 terminal and run the following command:
cd ..
Then, navigate to your code folder by running this command:
   cd <your language folder>
   # example cd python_3.6.8
Confirm that you are in the correct folder in your terminal path.
Task 5: Use the AWS SDK to Create a Lambda Function that Queries a Database
You decide to write and test a Lambda function that will query your lostcats database when it runs. You will then package the function for publishing on AWS Lambda. You will do all of these tasks in AWS Cloud9.

Because you completed the Amazon DynamoDB lab, you already have experience writing code that uses the AWS SDKs to query and scan a DynamoDB table. The code you write in this task should look very similar to the DynamoDB code. It was modified slightly so that it is in the preferred format that AWS Lambda uses to receive input from and handle output to Amazon API Gateway.

You remember that to query a DynamoDB table, you used a method like query, but you double check the AWS SDK documentation to make sure.

From the following table, open the link to the method for querying a DynamoDB table in the AWS SDK documentation for the language you want to code in.
Check the method name and establish what parameters you must pass in.
Language	AWS SDK Documentation deep link
Node.js (8.10.0)	https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#query-property
Ruby (2.6.0)	https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#query-instance_method
Python (3.6.8)	https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html#DynamoDB.Client.query
Write Some Code to Create a Lambda Function That Will Query a DynamoDB Table When It Runs
Before you begin, confirm that you are in the correct AWS Cloud9 terminal path and folder for the language you are going to use.

In the AWS Cloud9 environment, do the following:

In the code folder you are working from, open (double-click) the query_cats file.
Using the AWS SDK documentation for reference, replace the <Fill Me In> or <FMI> sections of the code in that file so that the code searches your lostcats database on breed and returns all the cat data for those of that breed. If you pass the word All as a filter (which means that no filter is used), the code will just do a table scan. Also, modify the code to return the cat information in a way the browser likes to receive data (that is, as a JSON array).
Save the file.
In the AWS Cloud9 terminal, run this file by using the run command for the language you chose, which is listed in the following table.
Language	Run Command
Node.js (8.10.0)	node query_cats.js "Russian Blue"
Ruby (2.6.0)	ruby query_cats.rb "Russian Blue"
Python (3.6.8)	python36 query_cats.py "Russian Blue"
Confirm That Your Code Works
When you run the command to search on the Russian Blue cat breed, you should see information for two cats (Natalia and Puddles). The results that are displayed in the terminal should look similar to this, depending on the language:

Local test for Russian Blue
null [
  {
    "petname": {
      "S": "Natalia"
    },
    "data_found": {
      "S": "2019-01-02TT17:19:52.608Z"
    },
    "breed": {
      "S": "Russian Blue"
    },
    "gender": {
      "S": "Female"
    },
    "notable_features": {
      "S": "Short tail"
    }
  },
  {
    "petname": {
      "S": "Puddles"
    },
    "data_found": {
      "S": "2019-01-02TT17:19:52.608Z"
    },
    "breed": {
      "S": "Russian Blue"
    },
    "gender": {
      "S": "Male"
    },
    "notable_features": {
      "S": "Cut on right ear"
    }
  }
]
If you can't complete these steps, or if your code doesn't work, refer to the solution code.

Next, try searching on a different breed by running the same run command, but replacing Russian Blue with a breed from the following list. Remember to include the double quotation marks around the search term. Be sure to search only for breeds from this list.
All
Bengal
Black Moggie
British Blue
Burmese
Cyprus
Egyptian Mau
Himalayan
Japanese Bobtail
Korat
Korean Bobtail
Maine Coon
Manx
Norwegian Forest Cat
Persian
Russian Blue
Scottish Fold
Siamese
Siberian
Somali
Sphynx
Turkish Angora
Congratulations! You have completed this task. You wrote a Lambda function that queries your lostcats database.

Task 6: Use the AWS SDK to Upload Your Lambda Deployment Package
Your code is working and is now ready to be packaged as a Lambda function. You decide to use the AWS SDK to perform this task, instead of using the AWS Lambda console.

You consider the subtasks that you must complete:

(Node.js only) Adjust the code slightly to work for AWS Lambda.
Create a package .zip file with your new code.
Upload the .zip file to your S3 bucket.
(NODE.JS ONLY): Modify the Code to Make it Work for AWS Lambda
If you are not using Node.js, then you can ignore this section and move to the next subtask (Create a Package .zip File With Your New Code).

AWS Lambda requires that you wrap your existing Node.js code with the following lines so that it works correctly.

At the very top of the query_cats.js file, add this line:
exports.handler = function(event, context, callback){ 
At the bottom of the file (after all your code), add this line:
};
Create a Package .zip File With Your New Code
You should still be in your respective code path where you just edited the query_cats file (for example, * /home/ec2-user/environment/node_8.10.0*).

To create a package .zip file with your new query_cats code, in the following command replace the <Fill Me In> or <FMI> with your file ending (such as .rb or .js or .py), and run the command in the AWS Cloud9 terminal:
zip website_api_code.zip query_cats.<FMI>
You should see that a new .zip file has been created in your code folder.

Reuse Some Code to Upload the .zip File to Your S3 Bucket
In Task 3, you uploaded a config file to your S3 bucket. Because that code worked earlier, you only need to change one line of code to upload your .zip file.

Open the upload_items file and modify it slightly as follows:

For the file_path variable, replace the path name with ./ so that it uses this current directory where your code is going to run. (That is, replace /home/ec2-user/environment/resources/ with the string ./)
For the file_name variable, replace the string config.js with the string website_api_code.zip.
Replace the string text/javascript with the string application/zip.
Save the upload_items file.
In the AWS Cloud9 terminal, run this file by using the run command for the language you chose, which is listed in the following table.
Language	Run Command
Node.js (8.10.0)	node upload_items.js
Ruby (2.6.0)	ruby upload_items.rb
Python (3.6.8)	python36 upload_items.py
If you can't complete these steps, or if your code doesn't work, refer to the solution code.

Congratulations! You have completed this task. You uploaded your Lambda deployment package to an S3 bucket, which AWS Lambda will use to load your application code.

In the next task, you will use the AWS SDK to write some code that references your deployment package and configures the Lambda function that you are creating.

Task 7: Use the AWS SDK to Call Your Deployment Package and Configure Your Lambda Function
From the following table, open the link to the method for creating a Lambda function in the AWS SDK documentation for the language you want to code in.
Check the method name and establish what parameters you must pass in.
Language	AWS SDK Documentation deep link
Node.js (8.10.0)	https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Lambda.html#createFunction-property
Ruby (2.6.0)	https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/Lambda/Client.html#create_function-instance_method
Python (3.6.8)	https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/lambda.html#Lambda.Client.create_function
Write Some Code to Call Your Deployment Package and Configure Your New Lambda Function
In the AWS Cloud9 environment, do the following:

In the code folder you are working from, open (double-click) the create_lambda file.
Using the AWS SDK documentation for reference, replace the <Fill Me In> or <FMI> sections of the code in that file so that the code creates a new Lambda function.
Note: The Lambda function that you are creating will be in the following runtimes that Lambda allows: Python 3.6 or Node.js 8.10 or Ruby 2.5 (These are the respective values that you would use in your create_lambda code.) Though you use a higher version of the runtime in your actual code, it will still work.

TIP: In this code, you will need to provide an AWS Identity and Access Management (IAM) execution role. This execution role was prepared for you and is called cat-search-role-for-lambda. Your Lambda function will use this IAM role to read from Amazon DynamoDB and to write logs to Amazon CloudWatch Logs for debugging (if needed).

To find the ARN for this role:

At the top of these instructions, click Details, and then next to AWS: click Show.
In the Credentials window that opens, scroll down to find the RoleARN.
TIP: For this code, you will also need to know the name of your S3 bucket.

Recall that to find your bucket name, you run the following command:
aws s3 ls | grep s3bucket
Save the create_lambda file.
In the AWS Cloud9 terminal, run this file by using the run command for the language you chose, which is listed in the following table.
Language	Run Command
Node.js (8.10.0)	node create_lambda.js
Ruby (2.6.0)	ruby create_lambda.rb
Python (3.6.8)	python36 create_lambda.py
Confirm That Your Code Works
If you used Node.js, you should see something similar to the following example:

Each language will produce something different, but you should see the value of FunctionArn.

null { FunctionName: 'CatSearch',
    FunctionArn: 'arn:aws:lambda:us-east-1: 179655947682:function:CatSearch',
    Runtime: 'nodejs6.10',
    Role: 'arn:aws:iam: : 179655947682:role/cat-search-role-for-lambda',
    Handler: 'query_cats.handler',
    CodeSize: 812,
    Description: 'Amazing cat website',
    Timeout: 30,
    MemorySize: 128,
    LastModified: '2019-04-26T15: 02: 30.991+0000',
    CodeSha256: 'IpIX+RQeXtlOPYoxjZNEe8VpiY4TvsRj5vJVVLRA9mE=',
    Version: '1',
    KMSKeyArn: null,
    TracingConfig: { Mode: 'PassThrough'
    },
    MasterArn: null,
    RevisionId: '7e022fdc-4a70-4e2e-b55d-441b247b4fcf'
}
If you see the FunctionARN, you have successfully created a Lambda function.

Now you will test your Lambda function.

Test Your Lambda Function
In the AWS Cloud9 terminal, enter the following command to search for Russian Blue:
aws lambda invoke --function-name CatSearch --payload '{"breed_str":"Russian Blue"}' query_cat_results.json
You should see output like this example:

{
    "ExecutedVersion": "$LATEST",
    "StatusCode": 200
}
The results appear in the query_cat_results.json file. Open that output file to view the contents. You should see results that look like this example:
[
  {
    "petname": {
      "S": "Natalia"
    },
    "data_found": {
      "S": "2019-01-02TT17:19:52.608Z"
    },
    "breed": {
      "S": "Russian Blue"
    },
    "gender": {
      "S": "Female"
    },
    "notable_features": {
      "S": "Short tail"
    }
  },
  {
    "petname": {
      "S": "Puddles"
    },
    "data_found": {
      "S": "2019-01-02TT17:19:52.608Z"
    },
    "breed": {
      "S": "Russian Blue"
    },
    "gender": {
      "S": "Male"
    },
    "notable_features": {
      "S": "Cut on right ear"
    }
  }
]
Modify the command to search for All breeds, and output the results to a different file called all_cat_results.json:
aws lambda invoke --function-name CatSearch --payload '{"breed_str":"All"}' all_cat_results.json
You should see output like this example:

{
    "ExecutedVersion": "$LATEST",
    "StatusCode": 200
}
In the AWS Cloud9 filesystem, you should see the all_cat_results.json output file. If you open that file, you should see all the cat data.

Congratulations! You have finished this task. You created a Lambda function that runs your application query code. You also told AWS Lambda where to look for that code.

Task 8: Clean Up Your AWS Cloud9 Environment
To clean up your AWS Cloud9 environment, do the following:

To find your bucket name, run the following command:
aws s3 ls | grep s3bucket
In the following command, replace the <Fill Me In> or <FMI>with your bucket name and run the command in the AWS Cloud9 terminal:
aws s3 rm s3://<FMI>/website_api_code.zip
Task 9: Replace the REST API Mock Endpoint With Your New Lambda Function
You must now connect your Amazon S3 website to your backend Lambda function. The final task in this lab is to replace the REST API mock endpoint with your Lambda function.

From the AWS Management Console, select API Gateway.

Under APIs, select the CatSearch API .

Under Resources, choose POST and then choose Integration Request.

For the Integration type, change Mock to Lambda Function.

WARNING: Make sure that Use Lambda Proxy Integration is not selected.

For Lambda Region, choose us-east-1.

For Lambda Function, enter CatSearch.

Leave Use Default Timeout selected.

Choose Save.

On the Switch to Lambda integration window, choose OK.

The console will show a message that you are adding Permissions to Lambda Function. Choose OK.

Confirm That It Works
To confirm that you have successfully connected your Amazon S3 website to your backend Lambda function, do the following:

At the top of the window, choose Method Execution.
Choose TEST.
In the Request Body, paste the following JSON:
 {
    "breed_str": "Russian Blue"
 }
Choose Test.
Under Response Body, you should see the following output:
[
  {
    "petname": {
      "S": "Natalia"
    },
    "data_found": {
      "S": "2019-01-02TT17:19:52.608Z"
    },
    "breed": {
      "S": "Russian Blue"
    },
    "gender": {
      "S": "Male"
    },
    "notable_features": {
      "S": "Cut on right ear"
    }
  },
  {
    "petname": {
      "S": "Puddles"
    },
    "data_found": {
      "S": "2019-01-02TT17:19:52.608Z"
    },
    "breed": {
      "S": "Russian Blue"
    },
    "gender": {
      "S": "Male"
    },
    "notable_features": {
      "S": "Cut on right ear"
    }
  }
]
In the Logs section, you should also see output that is similar to the following example, which indicates that the request was sent to your Lambda function:
Execution log for request 61c87a30-69eb-11e9-b71e-1baa86b24bd8
Sun Apr 28 19:25:29 UTC 2019 : Starting execution for request: 61c87a30-69eb-11e9-b71e-1baa86b24bd8
Sun Apr 28 19:25:29 UTC 2019 : HTTP Method: POST, Resource Path: /
Sun Apr 28 19:25:29 UTC 2019 : Method request path: {}
Sun Apr 28 19:25:29 UTC 2019 : Method request query string: {}
Sun Apr 28 19:25:29 UTC 2019 : Method request headers: {}
Sun Apr 28 19:25:29 UTC 2019 : Method request body before transformations:  {
    "breed_str": "Russian Blue"
 }
Sun Apr 28 19:25:29 UTC 2019 : Endpoint request URI: https://lambda.us-east-1.amazonaws.com/2015-03-31/functions/arn:aws:lambda:us-east-1:xxxxxxxxxxxx:function:CatSearch/invocations
Sun Apr 28 19:25:29 UTC 2019 : Endpoint request headers: {x-amzn-lambda-integration-tag=61c87a30-69eb-11e9-b71e-1baa86b24bd8, Authorization=************************************************************************************************************************************************************************************************************************************************************************************************************************aa6a3b, X-Amz-Date=20190428T192529Z, x-amzn-apigateway-api-id=1pb3ootatg, X-Amz-Source-Arn=arn:aws:execute-api:us-east-1:xxxxxxxxxx:1pb3ootatg/test-invoke-stage/POST/, Accept=application/json, User-Agent=AmazonAPIGateway_1pb3ootatg, X-Amz-Security-Token=AgoJb3JpZ2luX2VjEGIaCXVzLWVhc3QxxxxxxxxxxzxxxxxZk00LEgLsMqric5JrKxginrdtxs87od+nMd4a07BONAiBKWs/lrFcxsPMRfpxZTMbDfUi4HLD8rNrlcVRtLl1bSiraAwhLEAAaDDM5MjIyMDU3NjY1MCIMFKYV3ULLRvQZQtBiKrcDyiTQUuBSxrx9d6KzyrJt3+/++TZr7j/tQlzK4vPARcQ6QiyxGo1fJVWteo3RmjQotABIWKQareJ/VNxXGOhgpNDRnKwlgbx7/FYa1AgtjZjAFUwWSrjFb/FxW3CYKtB7uSSHl0ni//zAz8DZdpezUks/IK6Lt6QmWOio2pT [TRUNCATED]
Sun Apr 28 19:25:29 UTC 2019 : Endpoint request body after transformations:  {
    "breed_str": "Russian Blue"
 }
Sun Apr 28 19:25:29 UTC 2019 : Sending request to https://lambda.us-east-1.amazonaws.com/2015-03-31/functions/arn:aws:lambda:us-east-1:xxxxxxxxxxx:function:CatSearch/invocations
Sun Apr 28 19:25:29 UTC 2019 : Received response. Status: 200, Integration latency: 209 ms
Sun Apr 28 19:25:29 UTC 2019 : Endpoint response headers: {Date=Sun, 28 Apr 2019 19:25:29 GMT, Content-Type=application/json, Content-Length=370, Connection=keep-alive, x-amzn-RequestId=429c2ae7-f9a4-4880-b73b-8bab0c1bf551, x-amzn-Remapped-Content-Length=0, X-Amz-Executed-Version=$LATEST, X-Amzn-Trace-Id=root=1-5cc5fe29-57fc02c730e45bdf26308198;sampled=0}
Sun Apr 28 19:25:29 UTC 2019 : Endpoint response body before transformations: [{"petname": {"S": "Natalia"}, "data_found": {"S": "2019-01-02TT17:19:52.608Z"}, "breed": {"S": "Russian Blue"}, "gender": {"S": "Male"}, "notable_features": {"S": "Cut on right ear"}}, {"petname": {"S": "Puddles"}, "data_found": {"S": "2019-01-02TT17:19:52.608Z"}, "breed": {"S": "Russian Blue"}, "gender": {"S": "Male"}, "notable_features": {"S": "Cut on right ear"}}]
Sun Apr 28 19:25:29 UTC 2019 : Method response body after transformations: [{"petname": {"S": "Natalia"}, "data_found": {"S": "2019-01-02TT17:19:52.608Z"}, "breed": {"S": "Russian Blue"}, "gender": {"S": "Male"}, "notable_features": {"S": "Cut on right ear"}}, {"petname": {"S": "Puddles"}, "data_found": {"S": "2019-01-02TT17:19:52.608Z"}, "breed": {"S": "Russian Blue"}, "gender": {"S": "Male"}, "notable_features": {"S": "Cut on right ear"}}]
Sun Apr 28 19:25:29 UTC 2019 : Method response headers: {X-Amzn-Trace-Id=Root=1-5cc5fe29-57fc02c730e45bdf26308198;Sampled=0, Content-Type=application/json}
Sun Apr 28 19:25:29 UTC 2019 : Successfully completed execution
Sun Apr 28 19:25:29 UTC 2019 : Method completed with status: 200
You must now re-enable CORS.

Re-Enable CORS
Choose Actions and then choose Enable CORS. Like before, select DEFAULT 4XX and DEFAULT 5XX.
Choose Enable CORS and replace existing CORS headers.
On the Confirm method changes window, choose Yes, replace existing values .
Choose Actions again and then choose Deploy API.
For Deployment stage, select Prod.
Choose Deploy.
Navigate back to your Amazon S3 website. Refresh the page to see all cats, and try searching for a breed using the dropdown list to filter your search.
Congratulations! You have completed this task and have also completed the lab. You can now share your lost cat website with people to help find cat owners and let people know that they can now search for cats by breed.

Lab Complete
Congratulations! You have completed the lab.

Click End Lab at the top of this page and then click Yes to confirm that you want to end the lab.
A panel will appear, indicating that "DELETE has been initiated... You may close this message box now."
Click the X in the top right corner to close the panel.
For feedback, suggestions, or corrections, please email us at: aws-course-feedback@amazon.com
