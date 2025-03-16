import express, { Express, Request, Response } from "express";
import rootRouter from "./routes/rootRouter";
import { PrismaClient } from "@prisma/client";
import { PORT } from "./secrets";
import { errorResponseMiddleware } from "./middlewares/errorResponseMiddleware";
import { SignUpSchema } from "./schema/users";

const app: Express = express();
app.use(express.json());

app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({
  log: ["query"],
}).$extends({
  query: {
    user: {
      create({ args, query }) {
        args.data = SignUpSchema.parse(args.data);
        return query(args);
      },
    },
  },
});

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("OK");
});

app.use(errorResponseMiddleware);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
