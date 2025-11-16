// import express from "express";
// import authRoutes from "../routes/auth.routes.js"
// import dotenv from "dotenv"
// import { connectDB } from "../lib/db.js";
// import cookieParser from "cookie-parser"
// import messageRoute from "../routes/message.routes.js"
// import cors from 'cors';
// import {app, server,io } from "../lib/socket.js"

// import path from "path";

// dotenv.config();

// app.use(express.json());
// app.use(cookieParser());

// app.use(cors({
//     origin: "http://localhost:5173",
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],         
//     credentials:true
//     }
// ));


// const PORT = process.env.PORT;

// const  __dirname = path.resolve();

// app.use("/api/auth", authRoutes)
// app.use("/api/messages", messageRoute)

// if(process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../frontend/dist")));

//     app.get("*", (req,res) => {
//         res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//     })
// }


// server.listen(PORT, () => {
//     console.log(`server is running on ${PORT}`)
//     connectDB();
// })


import express from "express";
import authRoutes from "../routes/auth.routes.js"
import dotenv from "dotenv"
import { connectDB } from "../lib/db.js";
import cookieParser from "cookie-parser"
import messageRoute from "../routes/message.routes.js"
import cors from 'cors';
import { app, server, io } from "../lib/socket.js"
import path, { dirname } from "path";
import { fileURLToPath } from 'url';


dotenv.config();

const PORT =  5001 || process.env.PORT;
const __dirname = path.resolve();
const __filename = fileURLToPath(import.meta.url);

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));



app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoute);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});


