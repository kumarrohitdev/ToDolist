const app=require("./app")
const { dataBaseFun } = require("./utils/database")
//connecting to database

dataBaseFun()
const server=app.listen(1419,()=>{
    console.log(`your server is running: 1419`)
})


//catching unHandel error
process.on('unhandledRejection',(error)=>{
server.close(()=>{
    console.log(`server close due to unhandel error`);
    process.exit(1)
    })
 
    
})



