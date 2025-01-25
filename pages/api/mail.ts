import nodemailer from 'nodemailer'
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function mail(req: NextApiRequest, res: NextApiResponse) {
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_PORT ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS ||
    !process.env.TO_EMAIL ||
    !process.env.FROM_EMAIL
  ) {
    return res.status(500).json({
      message: `ERROR SENDING EMAIL VIA NODEMAILER: Check your environment variable config`,
    });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: parseInt(process.env.SMTP_PORT, 10) === 465, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  if (req.method === 'POST') {
    const { firstName, lastName, email, message } = req.body;
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: `PORTFOLIO: ${firstName} ${lastName} sent you a message!`,
      text: `
          Email: ${email}
          Message: ${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).end();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: `ERROR SENDING EMAIL VIA NODEMAILER: ${error.message}`,
        });
      }
    }
  }
  return res.status(200).end();
}
