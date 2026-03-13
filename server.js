require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

/*
================================
Test route
================================
*/

app.get("/", (req, res) => {
  res.send("FrameX backend running 🚀");
});

/*
================================
Contact form route
================================
*/

app.post("/send-email", async (req, res) => {

  const { name, email, phone, message } = req.body;

  console.log("Contact form request:", req.body);

  try {

    const response = await resend.emails.send({
      from: "FrameX <onboarding@resend.dev>",
      to: "framexstudio000@gmail.com",
      subject: "New FrameX Contact Lead 🚀",
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

/*
================================
Project onboarding route
================================
*/

app.post("/project-onboarding", async (req, res) => {

  const {
    name,
    email,
    phone,
    business,
    projectType,
    cms,
    pages,
    budget,
    notes
  } = req.body;

  console.log("New project lead:", req.body);

  try {

    const response = await resend.emails.send({
      from: "FrameX <onboarding@resend.dev>",
      to: "framexstudio000@gmail.com",
      subject: "New Client Project Request 🚀",

      html: `
      <h2>New Client Project Inquiry</h2>

      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Business:</strong> ${business}</p>

      <hr/>

      <p><strong>Project Type:</strong> ${projectType}</p>
      <p><strong>CMS Required:</strong> ${cms}</p>
      <p><strong>Pages:</strong> ${pages}</p>
      <p><strong>Budget:</strong> ${budget}</p>

      <hr/>

      <p><strong>Project Notes:</strong></p>
      <p>${notes}</p>
      `
    });

    console.log("Project email sent:", response);

    res.status(200).json({
      success: true
    });

  } catch (error) {

    console.error("Project email error:", error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

});

/*
================================
Server start
================================
*/

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});