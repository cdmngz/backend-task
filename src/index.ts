import express, { Request, Response } from "express";
import authRouting from "./routes/auth";
import publicRouting from "./routes/public";
import dotenv from "dotenv";
import cluster from "cluster";
import { cpus } from "os";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send(
    `<h2>Welcome to the API task</h2>
    <h3>Those are the apis:</h3>
    <ul>
      <li><a href='api/auth'>localhost/api/auth</a></li>
      <li><a href='api/auth/second-api'>localhost/api/auth/second-api</a></li>
      <li><a href='api/public'>localhost/api/public</a></li>
      <li><a href='api/public/second-api'>localhost/api/public/second-api</a></li>
    </ul>`
  );
});

app.use("/api/auth", authRouting);
app.use("/api/public", publicRouting);

if (cluster.isWorker) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} else {
  cpus().forEach(() => cluster.fork());
}
