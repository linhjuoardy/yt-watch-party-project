import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import healthRoutes from "./routes/health";
import { errorHandler } from "./middleware/errorHandler";
import roomRoutes from "./routes/room";


const app = express();



app.use("/health", healthRoutes);
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(errorHandler);
app.use("/api/v1/rooms", roomRoutes);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Backend is running 🚀",
  });
});

export default app;
