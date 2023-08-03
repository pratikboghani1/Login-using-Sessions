import mongoose from "mongoose";
import {} from 'dotenv/config'
const uri = process.env.MONGO_URI;

/*
 useNewUrlParser: true,
  useUnifiedTopology: true,
 */

  mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{console.log("Mongodb connected successfully !!!!!!!!!!")})
  .catch((error)=>{console.log(`Not Connected to mongo db due to the error below \n ${error}`)})


  const userSchema = mongoose.Schema({

     name : {type:String ,required :true},
     email : {type:String ,required :true},
     pwd   : {type:String ,required :true},



  })


  const userModel = mongoose.model('leon_user',userSchema)

 export default userModel