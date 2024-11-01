import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDhYedD3tsX2nYQ8l4vt5pkfTZpElWQ0ME");

const model = genAI.getGenerativeModel({
    model: "gemini-1.0-pro",
});

const generationConfig = {
    temperature: 0.9,
    topP: 1,
    maxOutputTokens: 2048,
    responseMimeType: "text/plain",
};

async function run() {
    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [
                {
                    role: "user",
                    parts: [
                        {
                            text: 'Analyze the sentiment of the following Tweets and classify them as POSITIVE, NEGATIVE, or NEUTRAL. "It\'s so beautiful today!"',
                        },
                    ],
                },
                {
                    role: "model",
                    parts: [{ text: "POSITIVE" }],
                },
                {
                    role: "user",
                    parts: [{ text: "\"It's so cold today I can't feel my feet...\"" }],
                },
                {
                    role: "model",
                    parts: [{ text: "NEGATIVE" }],
                },
                {
                    role: "user",
                    parts: [{ text: '"The weather today is perfectly adequate."' }],
                },
                {
                    role: "model",
                    parts: [{ text: "NEUTRAL\n" }],
                },
                {
                    role: "user",
                    parts: [{ text: '"heyyyyy guys due to virus people get killed in the world."' }],
                },
                {
                    role: "model",
                    parts: [{ text: "NOTSAFE\n" }],
                },
            ],
        });

        const result = await chatSession.sendMessage("heyyyyy guys due to virus people get killed in the world you will also get killed");
        console.log(result, " ", result.response.text());


        const safetyRatings = result.response.candidates[0].safetyRatings;
        const isSafe = safetyRatings.every((rating) => rating.probability === 'NEGLIGIBLE');
        if (!isSafe) {
            console.error("Safety concern detected:", safetyRatings);
            // Handle the safety concern here
        }
    } catch (error) {
        if (error) {
            console.error("Error:", error.message);
            console.error("Response:", error.response);
        } else {
            throw error;
        }
    }

}

run();
