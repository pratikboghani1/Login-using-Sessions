import userModel from "../models/db.js"
import bcrypt from 'bcrypt'

class Controller{


  static home_controller = (req,res)=>{

    res.render('home.ejs')
  }


  static signup_get = (req,res)=>{


      const new_user = req.session.new_usr

       delete req.session.new_usr
     
       res.render('signup.ejs',{new_user})
    
  }

  static login_get  = (req,res)=>{

       /*
        req.session.existing_msg = "User Already Exists !!!"

        req.session.existing_name = existing_usr.existing_name

       */

      const   existing_msg = req.session.existing_msg

      delete req.session.existing_msg

      const   existing_name = req.session.existing_name

      delete req.session.existing_name

      /*
          req.session.signup_success = "Signup Successfull !!!"
          req.session.saved_name = user_saved.name
      */

          const signup_success = req.session.signup_success

          delete req.session.signup_success

          const saved_name   =   req.session.saved_name

          delete req.session.saved_name

        /*
                 req.session.pwd_incorrect = "Please Enter Correct Password"
                  req.session.pwd_incorrect_usr_name = matched_usr.name
        
        */

                  const pwd_incorrect  = req.session.pwd_incorrect

                  delete req.session.pwd_incorrect

                  const pwd_incorrect_usr_name = req.session.pwd_incorrect_usr_name

                  delete req.session.pwd_incorrect_usr_name
    
    res.render('login.ejs',{ existing_msg ,existing_name,signup_success,saved_name,pwd_incorrect,pwd_incorrect_usr_name})
   
  }

  
  // this method will get the form data
  // then save it to mongo db
  static signup_post= async (req,res)=>{
    try{
    const form_data = req.body 

    // first we check that it is not an existing user in db

        const existing_usr = await userModel.findOne({email:form_data.usr_email})

        if(existing_usr){

          console.log(existing_usr)

          req.session.existing_msg = "User Already Exists !!!"

          req.session.existing_name = existing_usr.name

          console.log(req.session)

          res.redirect('/login')
        } 
        else{
          
          const hashed_pwd = await bcrypt.hash(form_data.usr_pwd,10)

          const user_from_sigunup = new userModel({
         
             name : form_data.usr_name ,
             email : form_data.usr_email,
             pwd  : hashed_pwd

          })

          const user_saved = await user_from_sigunup.save()

          req.session.signup_success = "Signup Successfull !!!"
          req.session.saved_name = user_saved.name

          res.redirect('/login')


        }



    }
    catch(error){
      console.log(error)
    }
    
   
}

 static login_post = async (req,res)=>{
  
        try{

          const form_data = req.body

          // first we check that email is mathed
          // or not with the user email in db

          const matched_usr = await userModel.findOne({email:form_data.usr_email})

          if(!matched_usr){

            req.session.new_usr = "You are a new User Please Signup First !!!"
            res.redirect('/signup')
          }
          else{
                const pwd_matched = await bcrypt.compare(form_data.usr_pwd,matched_usr.pwd)

                if(pwd_matched){

                  req.session.succes_msg = "Login Successfull Welcome"
                  req.session.sccuees_usr_name = matched_usr.name
                  
                  res.redirect('/dashboard')

                }
                else{

                  req.session.pwd_incorrect = "Please Enter Correct Password"
                  req.session.pwd_incorrect_usr_name = matched_usr.name
                 
                  res.redirect('/login')


                }

          }






        }catch(error){
          console.log(error)
          res.send(error)
        }
 
 }

   static dashboard_get = (req,res)=>{
      /*
      req.session.succes_msg = "Login Successfull Welcome"
      req.session.sccuees_usr_name = matched_usr.name

      */

      const succes_msg =  req.session.succes_msg

      delete  req.session.succes_msg

      const sccuees_usr_name = req.session.sccuees_usr_name

      delete req.session.sccuees_usr_name

       
      res.render('dashboard.ejs',{succes_msg,sccuees_usr_name})
   }

}
export default Controller