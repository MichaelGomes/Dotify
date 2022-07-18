import nodemailer from "nodemailer";

const sendResetEmail = (token, email) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const url = `${process.env.URL}/reset/${token}`;
  transporter.sendMail({
    to: email,
    subject: "Reset Password",
    html: `This email will expire in 10 minutes. Please click this link to reset your password: <a href=${url}>${url}</a>`,
  });
};

export default sendResetEmail;
