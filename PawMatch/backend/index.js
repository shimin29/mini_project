const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const petRoutes = require("./routes/petRoutes");
const petSubmissionRoutes = require("./routes/petSubmissionRoutes");

require("dotenv").config();

const corsHandler = cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
    preflightContinue: true,
});

app.use(corsHandler);
app.use(express.json());
app.use("/users", userRoutes);
app.use("/pets", petRoutes);
app.use("/pet-submissions", petSubmissionRoutes);

mongoose
    .connect("mongodb://localhost:27017/pawmatch")
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => console.log(err));

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
