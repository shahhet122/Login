const nodemail = require('nodemailer');
const { senderEmail, emailPassword } = require('../config/keys');

const sendEmail = async ({ name, emailTo, subject, code, content }) => {

    const transporter = nodemail.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: senderEmail,
            pass: emailPassword
        }
    });
    const message = {
        to: emailTo,
        subject,
        html: `
        <div>
            <h1>Hi ${name}!,</h1>
            <h1>${content}</h1>
            <h2>OTP: ${code}</h2>
            <p>Thanks for using our service.</p>
            <p>Regards,</p>
            <p>Het Shah</p>

        </div>`,


    };
    await transporter.sendMail(message);
}

module.exports = sendEmail;