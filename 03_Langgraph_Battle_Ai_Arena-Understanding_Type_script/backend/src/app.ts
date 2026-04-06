import express from "express";
import runGraph from "./ai/graph.ai.js";

const app = express();



app.get("/", async (req, res) => {

    const result = await runGraph("Write an article about apj abdul kalam 100 words.");
    console.log(result);
    res.send(result);
});

export default app;