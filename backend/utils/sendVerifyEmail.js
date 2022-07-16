import nodemailer from "nodemailer";

const sendVerifyEmail = (emailToken, email) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const url = `${process.env.URL}/verify/${emailToken}`;
  transporter.sendMail({
    to: email,
    subject: "Account Verification",
    html: `Please click this link to confirm your email: <a href=${url}>${url}</a>`,
  });
};

export default sendVerifyEmail;
