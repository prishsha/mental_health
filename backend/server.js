const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 REPLACE THIS WITH YOUR MONGODB ATLAS CONNECTION STRING
mongoose.connect("YOUR_MONGODB_ATLAS_CONNECTION_STRING");

const MessageSchema = new mongoose.Schema({
    text: String,
    category: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model("Message", MessageSchema);

app.post("/save", async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        await newMessage.save();
        res.status(200).json({ message: "Saved to MongoDB" });
    } catch (error) {
        res.status(500).json({ error: "Error saving data" });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});