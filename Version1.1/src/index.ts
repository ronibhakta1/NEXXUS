import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string;
	}
}>()


app.post('/api/v1/signup', async(c) => {
	const body = await c.req.json();
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try{
		await prisma.user.create({
			data: {
				email: body.email,
				username: body.username,
				phone: body.phone,
				name: body.name,
				password: body.password
			}
		})
		return c.text('signup route')
	} catch(e) {
		c.status(411);
		return c.text('Invaild data');
	}

	
})

app.post('/api/v1/signin', (c) => {
	return c.text('signin route')
})

// app.get('/api/v1/echo/:id', (c) => {
// 	const id = c.req.param('id')
// 	console.log(id);
// 	return c.text('get echo route')
// })

app.post('/api/v1/home', (c) => {

	return c.text('signin route')
})

app.put('/api/v1/home/bulkecho', (c) => {
	return c.text('signin route')
})

export default app
//


//DIRECT_URL="<YOUR_DATABASE_CONNECTION_STRING>"


