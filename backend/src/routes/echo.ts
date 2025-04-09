import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { decode, verify } from "hono/jwt";
import { createEcho, updateEcho } from "@ronibhakta/nexxus-common";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const echoRouter = new Hono<{
    Bindings: {
        [x: string]: string;
        DATABASE_URL: string;
        JWT_SECRET: string;
        GEN_AI_AUTH_KEY_1: string;
        GEN_AI_AUTH_KEY_2: string;
    };
    Variables: {
        userId: string;
    };
}>();

// Function to randomly select an API key
function getRandomApiKey(env: any): string {
    const keys = [env.GEN_AI_AUTH_KEY_1, env.GEN_AI_AUTH_KEY_2];
    return keys[Math.round(Math.random())]; // Math.round will give either 0 or 1
}

const generationConfig = {
    temperature: 0.9,
    topP: 1,
    maxOutputTokens: 280, // Ensuring suggestions are within tweet character limits
    responseMimeType: "text/plain",
};

async function generateRefinedEchoes(userInput: string, apiKey: string, fallbackApiKey: string): Promise<string[]> {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro",
    });

    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [
                {
                    role: "user",
                    parts: [
                        {
                            text: ` dont use any numburing or bullet points, and do not use any alphabetic characters to create lists. dont use * symbol to make text bold or italic, do not use any numbering or bullet points, and do not use any alphabetic characters to create lists. `,
                        },
                        {
                            text: ` You are a creative assistant dedicated to refining social media posts to ensure they are engaging, authentic, and suitable for a wide audience. Your goal is to transform content that may come across as offensive, harsh, or overly sensitive into something that feels positive, neutral, or appropriately funny, depending on the original tone. Use language that feels genuine and relatable, avoiding clichés or generic AI-generated phrasing. For each piece of content provided, craft four refined versions that echo the original sentiment but in a way that is more appealing and appropriate. If the content is meant to be funny, make it naturally humorous. If its serious or informative, keep it engaging yet respectful. You can use emojis and hashtags to make it more engaging. Also, don't make it sound like GPTs or AI. Do not use any symbols to make text bold or italic, do not use any numbering or bullet points, and do not use any alphabetic characters to create lists.`,
                        }
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

        return echoes.slice(0, 4); // Return the first four refined echoes
    } catch (error) {
        console.error("Error generating refined echoes with primary API key:", (error as Error).message);
        if ((error as any).response && ((error as any).response.status === 503 || (error as any).response.status === 429 || (error as any).response.status === 400)) {
            console.log("Primary API key overloaded, quota exceeded, or safety block. Retrying with fallback API key...");
            return generateRefinedEchoes(userInput, fallbackApiKey, apiKey); // Retry with fallback API key
        }
        if ((error as any).response) {
            if (error instanceof Error) {
                console.error("Response:", (error as any).response);
            }
        }
        return [];
    }
}
echoRouter.use("*", cors());

echoRouter.use("/*", async (c, next) => {
    //extract the user id
    //pass it down to the route handler
    const authHeader = c.req.header("Authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        // console.log(user);
        if (user) {
            c.set("userId", String(user.id));
            await next();
        } else {
            c.status(401);
            return c.json({
                alert: "You are not logged in",
            });
        }
    } catch (e) {
        return c.json({
            alert: "You are not logged in",
        });
    }
});

echoRouter.post("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    try {
        const userId = c.get("userId");
        const username = await prisma.user.findUnique({
            where: { id: Number(userId) },
        });
        // console.log("Decoded Payload:", username?.username as string);
        const validusername = await prisma.user.findUnique({
            where: { username: username?.username as string },
        });
        // console.log(validusername);
        if (!validusername) {
            c.status(400);
            return c.json({
                alert: "Invalid handle. Please provide a valid handle to post an echo.",
            });
        }
        // console.log(body);
        const { success } = createEcho.safeParse(body);
        // console.log(success);
        if (!success) {
            c.status(401);
            return c.json({
                alert:
                    "Incorrect input try filling all the fields correctly post a echo",
            });
        }
        const echo = await prisma.echo.create({
            data: {
                content: body.content,
                authorId: Number(userId),
                username: username?.username as string,
                time: new Date(),
            },
        });
        // console.log('Created echo:', echo);
        return c.json({
            id: echo.id,
            content: echo.content,
        });
    } catch (error) {
        c.status(500);
        return c.json({
            alert: "Internal Server Error",
        });
    }
});

// Define routes
echoRouter.post("/genaratesuggestionsgimini", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();

    const { success } = createEcho.safeParse(body);
    if (!success) {
        c.status(400);
        console.log(c);
        return c.json({
            alert: "Incorrect input try filling all the fields correctly post a echo",
        });
    }

    try {
        if (!body || !body.content) {
            c.status(400);
            return c.json({
                alert: "Content cannot be empty. Please provide content to generate suggestions.",
            });
        }
        // Generate refined suggestions based on the received content
        const primaryApiKey = c.env.GEN_AI_AUTH_KEY_1;
        const fallbackApiKey = c.env.GEN_AI_AUTH_KEY_2;
        const suggestions = await generateRefinedEchoes(body.content, primaryApiKey, fallbackApiKey);

        // console.log(suggestions);
        return c.json({ suggestions });
    } catch (error) {
        console.error("Error in /genaratesuggestionsgimini route:", error);
        c.status(500);
        return c.json({
            alert: "Internal Server Error",
        });
    }
});

echoRouter.put("/", async (c) => {
    const body = await c.req.json();
    const { success } = updateEcho.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({
            msg: "Incorrect input try filling all the fields correctly to update the echo",
        });
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const echo = await prisma.echo.update({
        where: {
            id: body.id,
            username: body.username,
        },
        data: {
            content: body.content,
            authorId: body.authorId,
            time: new Date(),
        },
    });

    return c.json({
        id: echo.id,
    });
});

//todo : add pagination
echoRouter.get("/bulkecho", async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const echos = await prisma.echo.findMany({
            select: {
                id: true,
                content: true,
                authorId: true,
                username: true,
                time: true,
                comments: true,
                reshares: true,
                likes: true,
                image: true,
                avatar: true,
                author: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: {
                time: "desc", // Ensure this field exists in the schema
            },
        });

        return c.json({ echos });
    } catch (error) {
        // console.error("Error fetching echos:", error);
        return c.json({ error: "Internal Server Error" }, 500);
    }
});

echoRouter.get("/:username/:id", async (c) => {
    const { username, id } = c.req.param();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const echo = await prisma.echo.findFirst({
            where: {
                id: Number(id),
                username: username,
            },
        });

        return c.json({
            echo,
        });
    } catch (e) {
        c.status(411);
        return c.json({
            message: "Error while fetching echo post",
        });
    }
});
