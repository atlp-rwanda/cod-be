/* eslint-disable no-console */
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
import sendResetPassword from './templates/sendResetVerification';

dotenv.config();

const sendResetVerification = async (
  email,
  firstname,
  emailToken,
  appUrl,
  res
) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const verificationUrl = `${appUrl}/password/${emailToken}/reset`;
  const msg = {
    to: email,
    from: process.env.SENDER_EMAIL,
    subject: 'Barefoot Nomad - Reset Password',
    text: `
        Hello ${firstname}, Copy & Paste The Link Below In Your Browser To Reset Your Password.
        ${verificationUrl}
        `,
    html: sendResetPassword(firstname, verificationUrl)
  };
  await sgMail
    .send(msg)
    .then(() => {
      res.status(201).json({
        status: 201,
        data: {
          Message: 'Password Reset Link Sent Successfully',
          emailToken: `${emailToken}`
        }
      });
      console.log('Password Reset Email Sent Successfully');
    })
    .catch((err) => {
      console.log({ Error: err });
    });
};

export default sendResetVerification;
