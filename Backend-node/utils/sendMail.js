import nodemailer from "nodemailer";

const sendMail = async ({ to, subject, resetCode }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: process.env.NODE_ENV === "development" ? 587 : 465,
      secure: process.env.NODE_ENV === "development" ? false : true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlTemplate = `
    <p>Hello,</p>
    <p>You recently requested to reset your password. Use the code below. It expires in <strong>10 minutes</strong>.</p>
    <p style="text-align:center; font-size:32px; color:#4f46e5; font-weight:bold; border:2px dashed #4f46e5; padding:10px 20px; border-radius:8px;">
    ${resetCode}
    </p>
    <p>If you did not request a password reset, ignore this email.</p>
    `;

    
    const info = await transporter.sendMail({
      from: `"Support" <${process.env.EMAIL_USER}>`,
      to,        
      subject, 
      html:htmlTemplate,  
    });

    console.log("Message sent:  ", info.messageId);
    return info;
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
};

export default sendMail;