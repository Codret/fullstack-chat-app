
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import authRoutes from "../routes/auth.routes.js";
import messageRoute from "../routes/message.routes.js";
import { connectDB } from "../lib/db.js";
import { app, server } from "../lib/socket.js";

const PORT = process.env.PORT || 5001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    // origin: process.env.FRONTEND_URL || "http://localhost:5173",
    origin: "https://fullstack-chat-app-uyn3.onrender.com",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});


// import express from "express";
// import authRoutes from "../routes/auth.routes.js"
// import dotenv from "dotenv"
// import { connectDB } from "../lib/db.js";
// import cookieParser from "cookie-parser"
// import messageRoute from "../routes/message.routes.js"
// import cors from 'cors';
// import { app, server, io } from "../lib/socket.js"
// import path, { dirname } from "path";
// import { fileURLToPath } from 'url';


// dotenv.config();


// const PORT = process.env.PORT || 5001;
// const __dirname = path.resolve();
// const __filename = fileURLToPath(import.meta.url);

// app.use(express.json());
// app.use(cookieParser());

// app.use(cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:5173",
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     credentials: true
// }));



// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoute);

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../frontend/dist")));

//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//     });
// }

// connectDB().then(() => {
//     server.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     });
// });


