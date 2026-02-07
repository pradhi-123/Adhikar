import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyC4SU7ev9a3C3jJUDEh7LLK08fKQ9ua_ws";
const genAI = new GoogleGenerativeAI(API_KEY);

async function testGen(modelName) {
    try {
        console.log(`Testing generation with: ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Say hello");
        console.log(`[PASS] ${modelName} responded:`, result.response.text());
        return true;
    } catch (error) {
        console.log(`[FAIL] ${modelName}:`, error.message);
        return false;
    }
}

async function run() {
    await testGen("gemini-2.0-flash");
    await testGen("gemini-1.5-flash");
}

run();
