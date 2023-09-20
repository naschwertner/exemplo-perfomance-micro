const express = require('express')
const app = express()
const redis = require("redis");
const host = "127.0.0.1"
const port = 6379; 
const clientRedis = redis.createClient(port, host)///default redis port




const getAllClients = ()=> {
    const time = Math.random() * 8000;
    return new Promise((resolve) =>{
        setTimeout(() => {
            resolve(
                [
                    {
                        "nome": "Camila Xavier"
                    },
                    {
                        "nome" : "Aluno 1"
                    }
                ]
            )

        },time)
    })

}


app.get("/", async(req, res)=>{

    //criando um cache  
    clientRedis.set("nome", "camila");

    //const clients = await getAllClients();
    res.status(200).send();
})


const startup = async()=> {
    //conectar o redis
    await clientRedis.connect();
    app.listen(3000, ()=>{
        console.log("Server is runnin on port 3000")
    })
}


startup();