/* eslint-disable no-console */
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
import sendVerifyEmail from './templates/sendVerification';

dotenv.config();

const sendVerification = async (
  email,
  firstname,
  userId,
  appUrl,
  emailToken,
  res
) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const verificationUrl = `http://${appUrl}/api/verify-user?token=${emailToken}`;
  const msg = {
    to: email,
    from: process.env.SENDER_EMAIL,
    subject: 'Barefoot Nomad - Verify Email',
    text: `
        Hello ${firstname}, Thank You For Registering With Barefoot Nomad.
        Copy & Paste The Link Below In Your Browser To Verify Your Email Address.
        ${verificationUrl}
        `,
    html: sendVerifyEmail(firstname, verificationUrl)
  };
  await sgMail
    .send(msg)
    .then(() => {
      res.status(201).json({
        Message: 'User Created',
        emailToken: `${emailToken}`,
        userId: `${userId}`
      });
      console.log('Verification Email Sent Successfully');
    })
    .catch((err) => {
      console.log({ Error: err });
    });
};

export default sendVerification;
