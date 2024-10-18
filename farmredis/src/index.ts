import express, { Request, Response, Router } from "express";
import colors from "colors";
import { rateLimit } from "express-rate-limit";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/config";
import router from "./routes/userRoutes";
import productRouter from "./routes/productRoutes";
import categoryRouter from "./routes/categoryRoute";
import orderRouter from "./routes/orderRoutes";
// import emailRouter from "./routes/emailRouter";
import helmet from "helmet";
import nodemailer from "nodemailer";
import ExpressMongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import Stripe from "stripe";
colors.enable();

const app = express();
app.use(cors({ origin: "http://192.168.1.3" }));
app.use(helmet());
app.use(ExpressMongoSanitize());
dotenv.config();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// const transport = nodemailer.createTransport({
//   host: "sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "174d98c654e2ce",
//     pass: "69458ffa23121b",
//   },
// });

// const sendEmail = async (recipient, subject, htmlContent) => {
//   try {
//     // Send mail with defined transport object
//     const info = await transport.sendMail({
//       from: "johndoetree67@gmail.com",
//       to: recipient,
//       subject: subject,
//       html: htmlContent,
//     });

//     console.log("Email sent: " + info.response);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };
// const emailrouter = express.Router();
// emailrouter.get("/sendEmail", async (req, res) => {
//   const orderConfirmationEmail = `
//     <p>Dear Customer,</p>
//     <p>Your order has been confirmed by the seller. Thank you for shopping with us!</p>
//     <p>Best regards,<br/>CultiVista</p>
//   `;

//   try {
//     // Send the email
//     await sendEmail(
//       "johndoetree67@gmail.com",
//       "Order Confirmation",
//       orderConfirmationEmail
//     );

//     res.status(200).json({
//       success: true,
//       message: "Email Sent Successfully",
//     });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).json({
//       success: false,
//       message: "Email Sending failed",
//     });
//   }
// });

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
// });

connectDB();

// stripe configuration
// export const stripe = new Stripe(process.env.STRIPE_API_SCERET);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

app.use("/api/v1/user", router);
app.use("/api/v1/products", productRouter);
// app.use("/api/v1/category", categoryRouter);
// app.use("/api/v1/order", orderRouter);
// app.use("/api/v1", emailrouter);

// // app.use("/api/v1/email", emailRouter);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} on ${process.env.NODE_ENV} mode`.bgYellow
  );
});
