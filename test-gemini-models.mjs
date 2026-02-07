import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyC4SU7ev9a3C3jJUDEh7LLK08fKQ9ua_ws";
const genAI = new GoogleGenerativeAI(API_KEY);

async function testModel(modelName) {
    try {
        console.log(`Testing model: ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello");
        console.log(`[PASS] ${modelName} works!`);
        return true;
    } catch (error) {
        console.log(`[FAIL] ${modelName}:`, error.message.split('\n')[0]);
        return false;
    }
}

async function run() {
    await testModel("gemini-1.5-flash");
    await testModel("gemini-1.5-flash-latest");
    await testModel("gemini-pro");
}

run();
