import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyC4SU7ev9a3C3jJUDEh7LLK08fKQ9ua_ws";
const genAI = new GoogleGenerativeAI(API_KEY);

async function testGen(modelName) {
    try {
        console.log(`--- Testing ${modelName} ---`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hi");
        console.log(`[SUCCESS] ${modelName}`);
        return true;
    } catch (error) {
        console.log(`[FAILURE] ${modelName}: ${error.message.split('\n')[0]}`);
        return false;
    }
}

async function run() {
    await testGen("gemini-2.0-flash");
    await testGen("gemini-2.5-flash");
    await testGen("gemini-flash-latest");
}

run();
