import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import logger from "./utils/logger";
import cors from "cors";
import connectDB from "./utils/connectDB";
import userRouter from "../src/routes/user.route";
import categoryRoute from "../src/routes/category.route";
import typeRoute from "../src/routes/type.route";

const app = express();
// const port = process.env.PORT;
const port = 5008;

// Middleware

// Body Parser middleware
app.use(express.json({ limit: "10kb" }));

app.use(
  cors({
    origin: ["http://localhost:5173", "https://test.epeakexpedition.com", "http://test.epeakexpedition.com", "http://epeak.com", "https://epeak.com"],
    credentials: true,
  })
);

// https://test.epeakexpedition.com/

// Route
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRoute);
app.use("/api/types", typeRoute);

// Testing
app.get("/healthChecker", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to epeak Server.",
  });
});

// UnKnown Routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);
  await connectDB();
});
