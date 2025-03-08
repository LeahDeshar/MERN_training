import nodemailer from "nodemailer";
import dotenv from "dotenv";
import crypto from "crypto";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import { OpenAI } from "openai";

dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const app = express();
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 300000 },
  })
);

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.PORT,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

app.get("/test-openai", async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Hello, how are you?" }],
    });
    res.json(response);
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    res.status(500).send("Failed to communicate with OpenAI");
  }
});
app.post("/send-otp", (req, res) => {
  const email = req.body.email;
  const otp = generateOTP();

  req.session.otp = otp;

  let mailOptions = {
    from: process.env.FROM,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It expires in 5 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: "Error sending email", error });
    }
    res.json({ message: "OTP sent successfully", info });
  });
});

app.post("/verify-otp", (req, res) => {
  const { otp } = req.body;

  if (!req.session.otp) {
    return res.status(400).json({ message: "OTP expired or not found" });
  }

  if (otp === req.session.otp) {
    req.session.otp = null;
    return res.json({ message: "OTP verified successfully" });
  }

  res.status(400).json({ message: "Invalid OTP" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
