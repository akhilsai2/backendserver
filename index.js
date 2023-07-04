const accountSid = 'ACbe87c127d2944496ab52305b6b96be6a';
const authToken = '3bc92c9ee1f6b24df009a3bcef6f2685';
const express = require("express");
const client = require('twilio')(accountSid, authToken);

const mongoose = require("mongoose");
const Dotenv = require('dotenv').config()
const cors = require("cors");
const app = express();

app.use(express.json())
app.use(cors())
const password = encodeURIComponent(process.env.PASS_WORD)

mongoose.connect(`mongodb+srv://saiakil456:${password}@cluster0.tnvzii2.mongodb.net/?retryWrites=true&w=majority`).then(() => console.log("connnected to mongo db")).catch(err => console.log(err))
const dataTable = mongoose.model("UserTable", {
    name: String,
    email: String,

})

app.listen(8000, () => {
    console.log("Successfully Connected to server")
})

app.post("/contact", (req, res) => {
    console.log("set")
    const Name = req.body.Name
    const Email = req.body.Email
    const Message = req.body.Message

    client.messages
        .create({
            body: `Name: ${Name}
  Email:${Email}
  Issue:${Message}`,
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+916304399102'
        })
        .then(message => {
            res.send("Message Send Successfully")
            console.log(message.sid)
        })
})

app.post("/getdata", async (req, res) => {
    // console.log("data get to post")
    const data = new dataTable({
        name: req.body.name,
        email: req.body.email,

    })
    const val = await data.save()
    res.json(val)
})

app.get("/", async (req, res) => {
    // console.log("get")
    res.send("get")
})


