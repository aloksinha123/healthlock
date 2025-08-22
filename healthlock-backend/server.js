const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Doctor = require("./models/Doctor");
const Patient = require("./models/Patient");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
mongoose.connect("mongodb+srv://dbsunhacks:sunhacks@cluster0.osghkwj.mongodb.net/healthlock?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ DB Error", err));

// --- Routes ---
app.post("/doctor/register", async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.json({ success: true, doctor });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/patient/register", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.json({ success: true, patient });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/doctors", async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});

app.get("/patients", async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
});

// --- Start Server ---
app.listen(5000, () => console.log("Server running on port 5000"));
