
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDhYedD3tsX2nYQ8l4vt5pkfTZpElWQ0ME");

const model = genAI.getGenerativeModel({
    model: "gemini-1.0-pro",
});

const generationConfig = {
    temperature: 0.9,
    topP: 1,
    maxOutputTokens: 280, // Ensuring suggestions are within tweet character limits
    responseMimeType: "text/plain",
};

async function generateRefinedEchoes(userInput) {
    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [
                {
                    role: "user",
                    parts: [
                        {
                            text: "You are a creative assistant dedicated to refining social media posts to ensure they are engaging, authentic, and suitable for a wide audience. Your goal is to transform content that may come across as offensive, harsh, or overly sensitive into something that feels positive, neutral, or appropriately funny, depending on the original tone. Use language that feels genuine and relatable, avoiding clichés or generic AI-generated phrasing.For each piece of content provided, craft four refined versions that echo the original sentiment but in a way that is more appealing and appropriate. If the content is meant to be funny, make it naturally humorous. If it’s serious or informative, keep it engaging yet respectful.you can use emogies and hashtags to make it more engaging also dont make it sound like gpts or ai.IMP dont use numbering for 4 different refined versions.",
                        },
                    ],
                },
            ],
        });

        // Generate refined suggestions based on the user's input
        const result = await chatSession.sendMessage(userInput);
        const echoes = result.response
            .text()
            .split("\n")
            .filter((echo) => echo.trim());

        if (echoes.length === 0) {
            console.log("No valid refined echoes generated.");
        } else {
            echoes.slice(0, 4).forEach((echo, index) => {
                console.log(`Refined Echo ${index + 1}: ${echo}`);
            });
        }
    } catch (error) {
        console.error("Error:", error.message);
        if (error.response) {
            console.error("Response:", error.response);
        }
    }
}

// Example user input
generateRefinedEchoes("The world is a scary place with so much suffering.");
