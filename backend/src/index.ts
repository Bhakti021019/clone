import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// ✅ Enable CORS for frontend
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());

// 📌 POST endpoint to save form data
app.post("/submit", async (req, res) => {
  let { aadhaar, pan, pincode, city, state } = req.body;

  // 🧹 Clean inputs
  aadhaar = aadhaar ? aadhaar.replace(/\D/g, "") : "";
  pan = pan ? pan.toUpperCase().trim() : "";

  // ✅ Validate Aadhaar (must be exactly 12 digits)
  if (aadhaar.length !== 12) {
    return res.status(400).json({ message: "Invalid Aadhaar number" });
  }

  // ✅ Validate PAN (must match Indian PAN format)
  if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan)) {
    return res.status(400).json({ message: "Invalid PAN number" });
  }

  try {
    const entry = await prisma.udyamSubmission.create({
      data: { aadhaar, pan, pincode, city, state },
    });
    res.status(200).json(entry);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Error saving data" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


export default app;