import express from "express";
import useGraph from './service/graph.ai.service.js';


const app = express();


app.get('/', (req, res)=>{
    return res.status(200).json({
        health: "good",
    })
})

app.post('/use-graph', async (req, res)=>{
    const result = await useGraph('Write a factorial in js?');
    return res.status(200).json({
        message: result,
    })
})


export default app;