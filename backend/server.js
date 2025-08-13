const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// ✅ POST /submit - Save form data
app.post("/submit", async (req, res) => {
  const { aadhaar, pan, pincode, city, state } = req.body;

  // Aadhaar must be 12 digits
  // const aadhaarRegex = /^\d{12}$/;
  // if (!aadhaarRegex.test(aadhaar)) {
  //   return res.status(400).json({ error: "Invalid Aadhaar" });
  // }

  // PAN must be 5 letters, 4 digits, 1 letter
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

  if (!panRegex.test(pan)) {
    return res.status(400).json({ error: "Invalid PAN" });
  }

  try {
    const submission = await prisma.udyamSubmission.create({
      data: { aadhaar, pan, pincode, city, state, version: 0 }
    });
    res.json(submission);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ GET /pin/:pincode - Lookup city & state by pincode
app.get("/pin/:pincode", async (req, res) => {
  const { pincode } = req.params;

  try {
    const record = await prisma.udyamSubmission.findFirst({
      where: { pincode }
    });

    if (!record) {
      return res.status(404).json({ error: "Pincode not found" });
    }

    res.json({ city: record.city, state: record.state });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ Start server on port 4000
app.listen(4000, () => console.log("🚀 Backend running on port 4000"));
