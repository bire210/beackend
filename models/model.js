const mongoose=require("mongoose");
const schema=mongoose.Schema;

let userchema= new schema({
    name:{type:String},
    email:{type:String},
    age:{type:Number},
    password:{type:String}
})

module.exports=mongoose.model("student",userchema)