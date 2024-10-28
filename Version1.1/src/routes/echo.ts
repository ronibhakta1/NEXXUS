import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, verify } from "hono/jwt";

export const echoRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	},
    Variables: {
        userId: string;
    }
}>();
echoRouter.use("/*",async (c, next)=>{
    //extract the user id
    //pass it down to the route handler 
    const authHeader = c.req.header("Authorization") || "";
    try{
        const user = await verify(authHeader,c.env.JWT_SECRET);
    if(user){
        c.set("userId", user.id);
        await next();
    }else{
        return c.json({
            message:"You are not logged in"
        });
    }
    }catch(e){
        return c.json({
            message:"You are not logged in"
        });
    }
    
});
// app.get('/api/v1/echo/:id', (c) => {
// 	const id = c.req.param('id')
// 	console.log(id);
// 	return c.text('get echo route')
// })

echoRouter.post("/",async (c) => {
    const userId = c.get("userId");
    const body = await c.req.json();
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const echo = await prisma.echo.create({
		data: {
			content: body.content,
			authorId: Number(userId),
			handle: body.handle,
			time: new Date(),
		}
	})

	return c.json({
        id: echo.id
    })
});

echoRouter.put("/", async(c) => {
	const body = await c.req.json();
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const echo = await prisma.echo.update({
        where: {
            id: body.id,
            handle: body.handle
        },
		data: {
			content: body.content,
			authorId: body.authorId,
			time: new Date(),
		}
	})

	return c.json({
        id: echo.id
    })
});

//todo : add pagination
echoRouter.get("/bulkecho", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
    const echos = await prisma.echo.findMany();
    return c.json({echos});
});

echoRouter.get("/:handle/:id", async (c) => {
    const { handle, id } = c.req.param();
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

    try{
        const echo = await prisma.echo.findFirst({    
            where: {
                id: Number(id),
                handle: handle
            },
        })
    
        return c.json({
                echo
        })
    } catch(e) {
        c.status(411);
        return c.json({
            message:"Error while fetching echo post"
    })
    }
	
});



