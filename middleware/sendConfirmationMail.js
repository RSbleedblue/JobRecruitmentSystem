// emailConfirmation.js

import nodemailer from "nodemailer";

// Create a Nodemailer transporter with your email service configuration
const transporter = nodemailer.createTransport({
  // Configure your email service here (e.g., Gmail, SMTP)
  service: "Gmail",
  auth: {
    user: "codingninjas2k16@gmail.com",
    pass: "slwvvlczduktvhdj",
  },
});

// Middleware function for sending confirmation emails
export const sendConfirmationEmailMiddleware = (req, res, next) => {
  const { name, bio, email } = req.body;
  const resumePath = req.file ? req.file.path : null;
  const applicantInfo = { name, bio, email, resumePath };

  const mailOptions = {
    from: "codingninjas2k16@gmail.com",
    to: email,
    subject: "Job Application Confirmation",
    text: `Dear ${applicantInfo.name},\n\nThank you for applying for the job. Your application has been received successfully.\n\nBest regards,\nYour Company`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending confirmation email: " + error);
     } else {
      console.log("Confirmation email sent: " + info.response);
      next();
    }
  });
};
