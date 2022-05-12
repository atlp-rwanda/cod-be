/* eslint-disable no-console */
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
import { sequelize } from '../../database/models';

dotenv.config();

export const sendNotification = async (email, accomodationId) => {
  const query = `SELECT name FROM accomodations WHERE ID='${accomodationId}'`;
  const [results] = await sequelize.query(`${query}`);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: process.env.SENDER_EMAIL,
    subject: 'Barefoot Nomad - Trip Request Info',
    text: `
        Hello, Thank you for your interest to make a trip and stay at ${results[0].name}.
        We will inform you about your request as earlier as possible.
        Regards!
        `
  };
  (async () => {
    try {
      const sendEmail = await sgMail.send(msg);
      return sendEmail;
    } catch (error) {
      return error;
    }
  })();
};
export const sendStatusNotification = async (email, status) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: process.env.SENDER_EMAIL,
    subject: 'Barefoot Nomad - Trip Request Update',
    text: `
        Hello, Your Recent Trip request is now ${status}.
        Thank you for choosing Barefoot Nomad and our destinations.
        Regards!
        `
  };
  (async () => {
    try {
      const sendEmail = await sgMail.send(msg);
      return sendEmail;
    } catch (error) {
      return error;
    }
  })();
};
