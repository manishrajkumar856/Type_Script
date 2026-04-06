import { HumanMessage } from "@langchain/core/messages";
import { StateSchema, MessagesValue, StateGraph, START, END, ReducedValue, Graph } from "@langchain/langgraph";
import type {GraphNode}  from "@langchain/langgraph";
import * as z from "zod";
import { choereModel, geminiModel, mistralModel } from "./models.ai.service.js";
import { createAgent, providerStrategy } from "langchain";

const State = new StateSchema({
  messages: MessagesValue,
  solution_1: new ReducedValue(z.string().default(''), {
    reducer: (current, next)=>{
        return next;
    }
  }),
  solution_2: new ReducedValue(z.string().default(''), {
    reducer: (current, next) =>{
        return next;
    }
  }),
  judge_recomendataion: new ReducedValue(z.object().default({
    solution_1_score: 0,
    solution_2_score: 0,
  }),
    {
        reducer: (current, next) =>{
            return next;
        }
    }
  )
});

const solutionNode : GraphNode <typeof State> = async (state: typeof State) => {

    const [mistral_solution, choere_solution] = await Promise.all([
        mistralModel.invoke(state.messages[0].text),
        choereModel.invoke(state.messages[0].text),
    ])
    
    return {
        solution_1: mistral_solution.text,
        solution_2: choere_solution.text,
    }
}

const judgeNode : GraphNode <typeof State> = async (state: typeof State) => {
    const {solution_1, solution_2} = state;

    const judge = createAgent({
        model: geminiModel,
        tools: [],
        responseFormat: providerStrategy(z.object({
            solution_1_score: z.number().min(0).max(10),
            solution_2_score: z.number().min(0).max(10),
        }))
    })

    const judgeResponse = await judge.invoke({
        messages: [
            new HumanMessage(
                `You are a judge tasked with evaluating the quality of two solutions provided for the 
                question: "${state.messages[0].text}". Please score each solution on a scale of 0 to 10, 
                where 0 indicates a poor solution and 10 indicates an excellent solution provide score between 0 - 10. Here are the 
                solutions:\n\nSolution 1: ${solution_1}\n\nSolution 2: ${solution_2}\n\nPlease provide your 
                scores in the following format:\n{\n  "solution_1_score": <score_for_solution_1>,\n  "solution_2_score": <score_for_solution_2>\n}`
            )
        ]
    });

    const result = judgeResponse.structuredResponse;

    return{
        judge_recomendataion: result,
    }
}

const graph = new StateGraph(State)
.addNode('solution', solutionNode)
.addNode('judge', judgeNode)
.addEdge(START, 'solution')
.addEdge("solution", "judge")
.addEdge("judge", END)
.compile();

export default async function(userMessage: string) {
    const result = await graph.invoke({
        messages: [
            new HumanMessage(userMessage),
        ]
    })

    console.log(result);
    return result.messages;
}