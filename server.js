import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 4000; // or your choice

app.use(cors());
app.use(bodyParser.json());

// Setup Nodemailer transport
const transporter = nodemailer.createTransport({
  service: "gmail", // or use "smtp"
  auth: {
    user: "your_email@gmail.com", // 🔑 sender email
    pass: "your_app_password" // 🔑 Google App Password (NOT normal password!)
  }
});

app.post("/send-email", async (req, res) => {
  const { from, message } = req.body;

  try {
    await transporter.sendMail({
      from,
      to: "caokhaiminh7903@gmail.com", // where you want to receive it
      subject: "New Contact Form Message",
      text: message,
      html: `<p><strong>From:</strong> ${from}</p><p>${message}</p>`
    });np

    res.status(200).json({ success: true, msg: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, msg: "Failed to send email" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
