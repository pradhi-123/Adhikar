import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyC4SU7ev9a3C3jJUDEh7LLK08fKQ9ua_ws";
const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
    try {
        // There isn't a direct listModels method on the client instance in this SDK version easily accessible
        // without digging into the underlying request.
        // However, we can use the fetch API directly to query the endpoint the error message suggested.
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
        if (!response.ok) {
            console.log("Error listing models:", response.status, response.statusText);
            const text = await response.text();
            console.log(text);
            return;
        }
        const data = await response.json();
        console.log("Available Models:");
        if (data.models) {
            const textModels = data.models.filter(m => m.supportedGenerationMethods.includes('generateContent'));
            console.log("Text Generation Models:");
            textModels.forEach(m => {
                console.log(`- ${m.name}`);
            });
        } else {
            console.log("No models found.");
        }
    } catch (error) {
        console.error("List Models Failed:", error);
    }
}

listModels();
