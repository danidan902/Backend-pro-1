import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import Contact from "./models/Contact.js";
import mongoose from "mongoose";
 
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001

app.use(cors({
  origin: "https://frontend-personal-pro-mame.vercel.app/",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));
app.use(express.json());

// db config

mongoose.connect(process.env.MONGO_URI, {
     useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected!"))
.catch((err) => console.error("❌ MongoDB failed:", err))


  // api config

app.post('/api/register', async (req, res) => {
  const {name, email, password, message} = req.body;
  
  try{

    const newContact = new Contact({name, email, password, message});
    await newContact.save();
    res.status(200).json({success: true, data:newContact})
  } catch(error) {
      console.error("Error saving contact:", error)
      res.status(500).json({success: false, message: "Sometime went wrong!"})
  }
})


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
