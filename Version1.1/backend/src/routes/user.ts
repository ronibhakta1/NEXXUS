import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { signupInput, signinInput } from "@ronibhakta/nexxus-common";

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
}>();

userRouter.post("/signup", async (c) => {
	const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({
            msg: "Invalid input try filling all the fields correctly",
        });
    }
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				username: body.username,
				phone: body.phone,
				name: body.name,
				password: body.password,
				
			},
		});
		const jwt = await sign(
			{
				id: user.id,
				username: user.username,
				name: user.name,
				email: user.email
			},
			c.env.JWT_SECRET
		);
		return c.text(jwt);
	} catch (e) {
		console.log(e);
		c.status(411);
		return c.text("Invaild data");
	}
});

userRouter.post("/signin", async (c) => {
	const body = await c.req.json();
	const { success } = signinInput.safeParse(body);
	if (!success) {
        c.status(400);
        return c.json({
            msg: "Invalid username or password try filling all the fields correctly",
        });
    }
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const user = await prisma.user.findFirst({
			where: {
				OR: [
					{ email: body.email },
					{ username: body.username }
				],
				password: body.password,
			},
		});
		if (!user) {
			c.status(403); //
			return c.json({ msg: "Wrong username or password" });
		}
		const jwt = await sign(
			{
				id: user.id,
			},
			c.env.JWT_SECRET
		);
		return c.text(jwt);
	} catch (e) {
		console.log(e);
		c.status(411);
		return c.text("Invaild data");
	}
});

userRouter.post("/logout", async (c) => {
	// Invalidate the JWT token here if you have a mechanism to do so
	// For example, you could maintain a blacklist of tokens in your database
	// Here we are just simulating the logout process
	localStorage.removeItem('token');
	c.status(200);
	return c.text("Logout successful");
	
});