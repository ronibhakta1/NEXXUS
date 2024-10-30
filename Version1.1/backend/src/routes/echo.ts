import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, verify } from "hono/jwt";
import { createEcho, updateEcho } from "@ronibhakta/nexxus-common";

export const echoRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    };
    Variables: {
        userId: string;
    };
}>();
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
        const authHeader = c.req.header("Authorization") || "";
    const { payload } = decode(authHeader);

    const username = payload.username;
    console.log("Decoded Payload:", username as string);
    const validusername = await prisma.user.findUnique({
        where: { username: username as string },
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
        c.status(400);
        return c.json({
            alert: "Incorrect input try filling all the fields correctly post a echo",
        });
    }
    const userId = c.get("userId");
    const echo = await prisma.echo.create({
        data: {
            content: body.content,
            authorId: Number(userId),
            username: username as string,
            time: new Date(),
        },
    }); 
    // console.log('Created echo:', echo);
    return c.json({
        id: echo.id,
        content: echo.content,
    });
    } catch (error) {
        
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
            retweets: true,
            likes: true,
            image: true,
            avatar: true,
            verified: true,
            user: true,
        },
        orderBy: {
            time: 'desc',
        },
    });
    return c.json({ echos });
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
