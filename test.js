const express= require("express");
const app = express();

const mongoose= require("mongoose");
app.use(express.json())

mongoose.connect("mongodb+srv://arvind83291:Ankit%4083291@cluster0.9nfy2pn.mongodb.net/App_Users");

// need to define the model of data to be stored in the database

const user = mongoose.model('Users',{name:String , email:String , password:String});


 app.post('/signup', async function(req,res){
    const name = req.body.name;
    const username = req.body.email;
    const password = req.body.password;

    const existinguser = await user.findOne({email:username});
    if(existinguser){
        res.status(403).json({
            msg:"User already exists"
        });
    }

    const User = new user({
        name:name,
        email:username,
        password:password
    });
    User.save();
    
    res.send("User Created sucessfully")

})
app.listen(3001);