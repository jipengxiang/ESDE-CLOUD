
var 
    AWS = require("aws-sdk"),                               
    DDB = new AWS.DynamoDB({
        apiVersion: "2012-08-10",
        region: "<FMI>"
    });                                                     

(function uploadItemstoDynamoDB(){
    var 
        cat_1 = {
            <FMI>{
                "petname":{
                    S: "Puddles"
                },
                "breed":{
                    S: "Russian Blue"
                }
            }, 
            <FMI>: "TOTAL", 
            <FMI>: "lostcats"
        };
     DDB.putItem(cat_1, function(err, data){   
         console.log(err, data);         
     });
     var 
        cat_2 = {
            <FMI>:{
                "petname":{
                    S: "Hosepipe"
                },
                "breed":{
                    S: "Scottish Fold"
                }
            }, 
            <FMI> "TOTAL", 
            <FMI>: "lostcats"
        };
     DDB.<FMI>(cat_2, function(err, data){   
         console.log(err, data);         
     });
})();
