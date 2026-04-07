import express from "express";
import runGraph from "./ai/graph.ai.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
}));


app.post("/api/chat", async (req, res) => {
    const {prompt} = req.body;

    const result = await runGraph(prompt);
    console.log(result);
    res.json({
        message: "Response send successfully",
        data: result,
    });
});

export default app;