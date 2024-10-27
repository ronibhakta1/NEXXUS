import { Hono } from 'hono'

const app = new Hono()


app.post('/api/v1/signup', (c) => {
	return c.text('signup route')
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


