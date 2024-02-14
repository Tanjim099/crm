import nodemailer from "nodemailer";
const sendEmail = async (email, subject, message) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.HOST,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            }
        });

        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM_EMAIL,
            to: process.env.SMTP_FROM_EMAIL,
            subject: subject,
            html: `${message}`
        });
        return info
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default sendEmail;