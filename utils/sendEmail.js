import nodeMailer from "nodemailer";

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    secure: process.env.NODE_ENV === "production",
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f4f6f8;
        font-family: Arial, sans-serif;
      }
      .container {
        width: 100%;
        padding: 20px;
        background-color: #f4f6f8;
      }
      .card {
        max-width: 500px;
        margin: auto;
        background: #ffffff;
        border-radius: 8px;
        padding: 30px 20px;
        text-align: center;
        box-shadow: 0 2px 6px rgba(0,0,0,0.05);
      }
      .title {
        font-size: 22px;
        font-weight: bold;
        color: #333;
        margin-bottom: 10px;
      }
      .text {
        font-size: 14px;
        color: #555;
        margin-bottom: 20px;
        line-height: 1.6;
      }
      .code {
        display: inline-block;
        font-size: 28px;
        letter-spacing: 6px;
        font-weight: bold;
        color: #ffffff;
        background: #007bff;
        padding: 12px 24px;
        border-radius: 6px;
        margin: 20px 0;
      }
      .footer {
        font-size: 12px;
        color: #999;
        margin-top: 20px;
      }

      /* Mobile */
      @media screen and (max-width: 480px) {
        .card {
          padding: 20px 15px;
        }
        .code {
          font-size: 24px;
          letter-spacing: 4px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="card">
        <div class="title">Password Reset</div>

        <div class="text">
          Hello ${options.name},<br/><br/>
          You requested to reset your password.<br/>
          Use the verification code below:
        </div>

        <div class="code">${options.code}</div>

        <div class="text">
          This code will expire in ${options.expire || "10 minutes"}.
          <br/><br/>
          If you did not request this, please ignore this email.
        </div>

        <div class="footer">
          © ${new Date().getFullYear()} HyperNote Security Team
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject || "Password Reset Code",
    html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;