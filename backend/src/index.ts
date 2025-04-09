import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { echoRouter } from "./routes/echo";
import { cors } from 'hono/cors'

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
}>();
app.use('/*', cors())
app.route("/api/v1/user", userRouter);
app.route("/api/v1/echo", echoRouter);
// app.route("/api/v1/echo/bulkecho", echoRouter);

export default app;
//DIRECT_URL="<YOUR_DATABASE_CONNECTION_STRING>"