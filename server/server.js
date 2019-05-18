const isEmpty = require('../utils/utils');
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const mongoose = require('mongoose')
const loginMessage = require('./models/LoginMessage')
const Records = require('./models/Records')
// our localhost port
const port = 4001
const app = express()
// our server instance
const server = http.createServer(app)
// This creates our socket using the instance of the server
const io = socketIO(server)

io.on('connection', socket => {
    // Gets the ranking of the challenges and pass them to Main Page
    function getRanking(challenge,account) {
        let keys = challenge + "_Best"
        let topTen = undefined
        let myScore = undefined
        // order of the ranking 
        let ord = (challenge === "reactTime") ? 1 : -1
        // get TopTen
        Records.find().sort({[keys]: ord}).limit(10).exec((err,topTen) => {
            topTen = topTen
            // Send the data to mainPage
            socket.emit(keys,topTen)
        })
        // get user Score
        Records.find({username: account.username}).exec((err,accDetail) => {
            myScore = accDetail[0]
            // Send the data to mainPage
            socket.emit(keys + "_my",myScore)
        })
        
    }
    console.log('User connected')
    // Tell the browser to show the login page
    socket.emit('start')
  
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
    
    socket.on('test',(message) => {
        console.log(message)
    })
    // To loginPage
    socket.on("loginPage", () => {
        socket.emit("loginPage")
    })
    // To ReactTime
    socket.on("reactTime", accountDetail => {
        socket.emit("reactTime", accountDetail)
    })
    // To number Memory
    socket.on("NumMem", accountDetail => {
        socket.emit("NumMem", accountDetail)
    })
    // Handle account login
    socket.on('login',accountDetail =>{
        console.log("login request recieved")
        const username = accountDetail.username
        const password = accountDetail.password
        // Check if username and password are correct
        loginMessage.find({username: username, password: password}).exec((err,acc) => {
            if(isEmpty(acc)){
                console.log("Error")
            }
            else{
                console.log("Logged in")
                let challenges = ["reactTime","numMemory"]
                // Get rankings for the challenges
                challenges.forEach((challenge) => {
                    getRanking(challenge,acc[0])
                })
                // Sent the account info to mainPage
                socket.emit("mainPage",acc[0])
            }
        })
    })
    // Handle account registeration
    socket.on('reg',accountDetail =>{  
        console.log("Reg request recieved")
        const username = accountDetail.username
        const password = accountDetail.password
        // Initialize the records
        const [reactTime_Best, reactTime_Avg, reactTime_count, numMemory_Best, numMemory_Avg, numMemory_count] = [999,0,0,0,0,0]
        const regAccount = new loginMessage({username, password})
        const Record = new Records({username, reactTime_Best, reactTime_Avg, reactTime_count, 
                                    numMemory_Best, numMemory_Avg, numMemory_count})
        regAccount.save(() => {
            console.log("Account registered")
        })
        Record.save(() => {
            console.log("Records registered")
        })
    })
    // Handle account logout
    socket.on('logout',() => {
        socket.emit('start')
    })
    // Handle reactTime record saving
    socket.on('save_reactTime', (acc,reactTime) => {
        console.log([acc,reactTime])
        const user = acc.username
        console.log(user)
        const query = {username: user}
        // Find the user's record
        Records.find(query).exec((err,r) => {
            const records = r[0]
            // update Best if previous record is surpassed
            if(records.reactTime_Best > reactTime || records.reactTime_Best === 999){
                Records.findOneAndUpdate(query,{reactTime_Best: reactTime},() => {})
            }
            // update Avg and count
            const time_total = records.reactTime_Avg * records.reactTime_count
            const new_count = records.reactTime_count + 1
            Records.findOneAndUpdate(query,{reactTime_Avg: (time_total + reactTime)/new_count, reactTime_count: new_count},() => {})
        })
    })
    // Handle NumMemory record saving
    socket.on('save_numMem', (acc,level,callback) => {
        console.log([acc,level])
        const user = acc.username
        console.log(user)
        const query = {username: user}
        // Find the user's record
        Records.find(query).exec((err,r) => {
            const records = r[0]
            // update Best if previous record is surpassed
            if(records.numMemory_Best < level){
                Records.findOneAndUpdate(query,{numMemory_Best: level},() => {})
            }
            // update Avg and count
            const level_total = records.numMemory_Avg * records.numMemory_count
            const new_count = records.numMemory_count + 1
            Records.findOneAndUpdate(query,{numMemory_Avg: (level + level_total)/new_count, numMemory_count: new_count},callback)
        })
    })
})

// Connect to the Mongos database
mongoose.connect('mongodb+srv://Henrylaih41:71DXm1PqOGM6evq9@cluster0-oxmtm.gcp.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
})
db = mongoose.connection
db.on('error', error => {
    console.log(error)
})
db.once('open', () => {
    console.log('MongoDB connected!')
})
server.listen(port, () => console.log(`Listening on port ${port}`)) 