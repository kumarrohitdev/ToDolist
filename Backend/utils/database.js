const mongoose=require("mongoose")
exports.dataBaseFun=()=>{
mongoose.connect("mongodb://localhost:27017/Tasks").then(()=>{
    console.log('Database Connected : localhost')
}).catch((err)=>{
    console.log(err)
})}