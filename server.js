require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("FrameX backend running 🚀");
});

app.post("/send-email", async (req, res) => {
  const { name, email, phone, message } = req.body;

  console.log("Received request:", req.body);

  try {
    const response = await resend.emails.send({
      from: "FrameX <onboarding@resend.dev>",
      to: "framexstudio000@gmail.com",
      subject: "New FrameX Lead 🚀",
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    console.log("Email sent:", response);

    res.status(200).json({
      success: true,
    });

  } catch (error) {
    console.error("Email Error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});