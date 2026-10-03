const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./Config/db")
const authRoutes = require("./Routes/authRoutes")
const testroutes = require("./Routes/testRoutes")
const caseRoutes = require("./Routes/caseRoutes")
const clientRoutes = require("./Routes/clientRoutes")
const documentRoutes = require("./Routes/documentRoutes")
const hearingRoutes = require("./Routes/hearingRoutes")
const hourRoutes = require("./Routes/hourRoutes")
const invoiceRoutes = require("./Routes/invoiceRoutes")
const http = require("http");
const { Server } = require("socket.io");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    socket.on("joinRoom", (userId) => {
        socket.join(userId);

        console.log(
            `User ${userId} joined notification room`
        );
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

connectDB();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use("/api/auth", authRoutes)
app.use("/api/test", testroutes)
app.use("/api/cases", caseRoutes)
app.use("/api/clients", clientRoutes)
app.use("/api/documents", documentRoutes)
app.use("/api/hearings", hearingRoutes)
app.use("/api/hours", hourRoutes)
app.use("/api/invoices", invoiceRoutes)
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to LawTrack API"
    })
})

const PORT = process.env.PORT || 5001

server.listen(PORT, () => {
    console.log("Server Running on Port 5001");
});