//import jsonwebtoken
const jwt = require('jsonwebtoken')

const db = require('./db')


users = {
  1000: { userid: 1000, name: "Vipin", password: "1000", event: [] },
  1001: { userid: 1001, name: "Kevin", password: "1001",  event: [] },
  1002: { userid: 1002, name: "Mini", password: "1002",  event: [] }
}

//Register definition
const register = (name, userid, password) => {
  //ASYNCHRONOUS
  return db.User.findOne({ userid })
    .then(user => {
      console.log(user);
      if (user) {
        return {
          statusCode: 401,
          status: false,
          message: "User already Exists... Please Login!!!!"
        }
      }
      else {
        const newUser = new db.User({
          userid,
          name,
          password,
          
          event: []
        })
        newUser.save()
        return {
          statusCode: 200,
          status: true,
          message: "User created sucessfully!!!!"
        }
      }
    })
}


//login definition
const login = (userid, password) => {

  //asynchronous call

  return db.User.findOne({userid,password})
    .then(user => {
      if (user) {
        currentUserId = userid
        currentName = user.name

        //token generation
        const token = jwt.sign({
          currentUserId: userid
        }, 'supersecretkey123')

        return {
          statusCode: 200,
          status: true,
          message: "Sucessfully Logged In!!!!",
          currentUserId,
          currentName,
          token
        }

      }
      return {
        statusCode: 401,
        status: false,
        message: "Invalid Credentials"
      }

    })
}






//event
const event = ( userid,  eventname, eventdate) => {
  
  return db.User.findOne({
    userid,
    
    eventname,
    eventdate
   
  }).then(user => {
    if (user) {
        // currentEventName = eventname
        // currentEventDate = eventdate
        user.event.push({
          eventname: eventname,
          eventdate: eventdate,
          
         
        })
    user.save()
      return {
        statusCode: 200,
        status: true,
        message:"Event Added Successfully",
        // currentEventName,
        //   currentEventDate,
        

      }
    }
    return {
      statusCode: 401,
      status: false,
      message: "Invalid Credentials"
    }
  })
}




//getevent
const getEvent = ( userid
  ) => {
  // acno = req.currentAcc
    console.log(userid,
      );
  return db.User.findOne({
    
    
    userid
  }).then(user=>{
    if(user){
  return {
      statusCode: 200,
      status: true,
      event: user.event
    }

  }
  else {
    return {
      statusCode: 401,
      status: false,
      message: "Invalid Credentials!!!!"
    }
  }
})
}


//deleteevent
// const deleteAcc=(acno)=>{
//   return db.User.deleteOne({
//     acno
//   }).then(user=>{
//     if(user){
//       return{
//       statusCode: 200,
//       status: true,
//       message: "Account deleted successfully!!!"
//     }
//   }
//   else{
//     return {
//       statusCode: 401,
//       status: false,
//       message: "Operation Denied"
//     }
//   }
//   })
// }


//export
module.exports = {
  register,
  login,
  event,
  
  getEvent
  // deleteAcc
}