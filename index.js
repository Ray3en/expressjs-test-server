const express = require('express')
const PORT = 3333
const app = express()
const mongoose = require('mongoose')
const db_config = 'mongodb+srv://tigran:1223@cluster0.thndbg2.mongodb.net/?retryWrites=true&w=majority'

const router = require('./router')

app.use(express.json());
app.use('/api', router)

async function startApp(){
    try {
        await mongoose.connect(db_config)
        app.listen(PORT, () => {
            console.log(`Server start http://localhost:${PORT}`)
        })
    } catch(e){
        console.log(e)
    }
}

startApp()