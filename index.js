//import express
const express = require('express')

const dataService = require('./services/data.services')

const jwt = require('jsonwebtoken')
const cors = require('cors')
const req = require('express/lib/request')

//Create app using express
const app = express()

//cors
app.use(cors({
origin:'http://localhost:4200'
// origin:'http://192.168.1.4:8080'
}))

//parse json
app.use(express.json())

//resolving http request

//get Request - to fetch
app.get('/', (req, res) => {
    res.status(401).send("GET REQUEST!!!")
})

//post request - to create
app.post('/', (req, res) => {
    res.send("POST REQUEST!!!")
})

//put request - to modify
app.put('/', (req, res) => {
    res.send("PUT REQUEST!!!")
})

//patch request - to partially modify
app.patch('/', (req, res) => {
    res.send("PATCH REQUEST!!!")
})

//delete request - to delete
app.delete('/', (req, res) => {
    res.send("DELETE REQUEST!!!")
})

//middleware application specific
// app.use((req,res,next)=>{
//     console.log("APPLICATION SPECIFIC MIDDLEWARE")
//     next()
// })

//middleware-application specific-another way
const logMiddleware = (req, res, next) => {
    console.log("APPLICATION SPECIFIC MIDDLEWARE")
    next()
}
app.use(logMiddleware)



//jwtMiddleware-To validate token
const jwtMiddleware = (req, res, next) => {
    try {
        const token = req.headers["x-access-token"]
        const data = jwt.verify(token, 'supersecretkey123')
        req.currentUserId = data.currentUserId
        next()
    }
    catch {
        res.json({
            statusCode: 401,
            status: false,
            message: 'Please Log In'
        })
    }
}

//Register API
app.post('/register', (req, res) => {
    console.log(req.body);
    //asynchronous
    dataService.register(req.body.name, req.body.userid, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

//Login API
app.post('/login', (req, res) => {
    console.log(req.body);
    //asynchronous
    dataService.login(req.body.userid, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)
           
        })
})

//event API
app.post('/event', jwtMiddleware, (req, res) => {
    console.log(req.body);
    //asynchronous
    dataService.event(req.body.userid, req.body.eventname, req.body.eventdate)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
}) 



//getEvent API
app.post('/getEvent/:userid', jwtMiddleware, (req, res) => {
    console.log( req.params.userid);
    //asynchronous
    dataService.getEvent(req.params.userid)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

//deleteAcc API
// app.delete('/deleteAcc/:acno', jwtMiddleware, (req, res) =>{
//     //asynchronous
//     dataService.deleteAcc(req.params.acno)
//     .then(result=> {
//         res.status(result.statusCode).json(result)
//     })
// })


//set port number for server
app.listen(4000, () => {
    console.log("Server started at 4000");
})
