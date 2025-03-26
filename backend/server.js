import puppeteer from "puppeteer";
import express from "express"
import cors from "cors";
import { getuser } from "./puppet.js";
const app = express();
const PORT=5000;

app.use(cors())
app.use(express.json())

// app.get('/scrape', async (req, res) => {
//     try
//     {   
//         const data = await scrapeData()
//         res.json(data)
//     }
//     catch(error){
//         console.error('scarpe route failed, error : ', error)
//         res.status(500).json({error:error.message})
//     }
// })

app.post("/login", async (req, res) => {
    try{
        const {roll, pass} = req.body
        console.log(roll)
        console.log(pass)
        const data = await getuser(roll, pass)
        res.json(data)
    }
    catch(error){
        res.status(500).json({
            "user" : {
            "success":false,
            "error":error.message
        }})
        console.error('Error message : ', error)
    }
})





app.listen(PORT, ()=> console.log('Server running...'));
