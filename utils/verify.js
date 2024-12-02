const { run }=require("hardhat")
const verify=async (contrataddress, args) => {
    console.log("verfying...")
    try{
    await run("verify:verify",{
         address: contrataddress,
         constructorArguments: args,
     }) 
     } catch (e){
         if (e.message.toLowerCase().includes("already verified")){
             console.log("Contract already verified")
         }else{
             console.log(e)
         }
     }
 
 }
module.exports={verify}