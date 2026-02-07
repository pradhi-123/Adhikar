import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyC4SU7ev9a3C3jJUDEh7LLK08fKQ9ua_ws"; // Hardcoded from .env.local for testing
const genAI = new GoogleGenerativeAI(API_KEY);

async function run() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        console.log("Testing Gemini API connection...");
        const result = await model.generateContent("Say hello");
        console.log("Success! Response:", result.response.text());
    } catch (error) {
        console.error("API Test Failed:");
        console.error("Message:", error.message);
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Status Text:", error.response.statusText);
        }
    }
}

run();
