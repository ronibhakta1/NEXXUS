import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { echoRouter } from "./routes/echo";


const app = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
}>();
app.route("/api/v1/user", userRouter);
app.route("/api/v1/echo", echoRouter);

export default app;
//DIRECT_URL="<YOUR_DATABASE_CONNECTION_STRING>"