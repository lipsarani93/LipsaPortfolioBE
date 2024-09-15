const nodemailer = require('nodemailer');

// Create a reusable transporter object
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use any email service
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS  // Your email password or app-specific password
    }
  });

// Function to send email
const sendEmail = async (name, email, message) => {
    try {
        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER, // Replace with your email
            subject: `New Contact Form Submission from ${name}`,
            text: `You have received a new message from ${name} (${email}):\n\n${message}`
        };

        // Send the email
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return { status: 'success', message: 'Email sent successfully!' };
    } catch (error) {
        console.log('Error sending email:', error);
        return { status: 'fail', message: 'Failed to send email' };
    }
};

module.exports = { sendEmail };
