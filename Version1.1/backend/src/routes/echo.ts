import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, verify } from "hono/jwt";
import { createEcho, updateEcho} from "@ronibhakta/nexxus-common";
import { UNABLE_TO_FIND_POSTINSTALL_TRIGGER_JSON_SCHEMA_ERROR } from "@prisma/client/scripts/postinstall.js";

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
        c.set("userId", String(user.id));
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
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();

    const { username } = await c.req.json();
    const validusername = await prisma.user.findUnique({
        where: { username: username },
    });
    // console.log(validusername);
    if (!validusername) {
        c.status(400);
        return c.json({
            msg: "Invalid handle. Please provide a valid handle to post an echo.",
        });
    } 
    // console.log(body);
    const { success } = createEcho.safeParse(body);
    console.log(success);
    if (!success) {
        c.status(400);
        return c.json({
            msg: "Incorrect input try filling all the fields correctly post a echo",
        });
    }

    const userId = c.get("userId");
	const echo = await prisma.echo.create({
		data: {
			content: body.content,
			authorId: Number(userId),
			username: body.username,
			time: new Date(),
		}
	})
    // console.log('Created echo:', echo);
    return c.json({
        id: echo.id,
        content: echo.content,
    })
});

echoRouter.put("/", async(c) => {
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
            username: body.username
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

echoRouter.get("/:username/:id", async (c) => {
    const { username, id } = c.req.param();
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

    try{
        const echo = await prisma.echo.findFirst({    
            where: {
                id: Number(id),
                username: username
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



