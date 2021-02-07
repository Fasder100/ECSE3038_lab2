const { response } = require("express");
const express = require("express");

const cors = require ("cors");
const app = express();

/*DB = {
    "success": true,
    "data": {
        "username": "jmjager",
        "color": "blue",
        "role": "supervisor"
    }


}*/
DB = [
    {
    id : 1,
    usernname : "jmjager",
    color : "black",
    role: "supervisor",
    }
];
tankDB = [];

app.use(express.json());
app.use(cors());

app.get("/", function(request,response){

    response.send("hello");
});
//DATA
app.get("/data", function(request, response){
    response.json(tankDB);

});
app.post("/data", function(request, response){
    const data = {
        id: tankDB.length + 1,
        location : request.body.location,
        lat: request.body.lat,
        long: request.body.long,
        last_updated: Date.now().toString(),
    };
    tankDB.push (data);
    response.json(data);
    
    });

app.patch("/data/:id", function(req,res){

    DB.array.forEach( (i) => {
        
        if (i["id"] == req.params.id){
            i["location"] = req.body.location;
            i["lat"] = req.body.lat;
            i["long"] = req.body.long;
            i["percentage_full"] = req.body.percentage_full;

        }
        res.json(req.body);
        
    });

});

app.delete("/data/:id", function(request,response){

    tankDB.forEach((i)=> {
        if (i["id"] == request.params.id){

            var index = tankDB.indexOf(i);
            tankDB.splice(index, 1);           
        }
    })
    response.json("Deleted");
    
});

//PROFILE
app.get("/profile", function (request, response){
    response.json(DB);
});
app.get("/profile/:id", function(request,response){

    DB.array.forEach( (i) => {
        
        if (i["id"] == request.params.id){
            var output = request.body;
        }
       
        
    });
    response.json(output); 

});

app.post("/profile", function(request,response){
const profile = {
    id: DB.length +1,
    username : request.body.username,
    color: request.body.color,
    role: request.body.role,
    last_updated: Date.now().toString(),
};
DB.push (profile);
response.json(profile);

});

app.patch("/profile/:id", function(req,res){

    DB.forEach( (i) => {
        
        if (i["id"] == req.params.id){
            i["username"] = req.body.username;
            i["color"] = req.body.color;
            i["role"] = req.body.role;
            i["last_updated"] = Date.now().toString();
        }
        res.json(req.body);
        
    });

});

app.listen(3000);

