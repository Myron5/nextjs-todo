import nodemailer from "nodemailer";

class MailService {
  private transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    secure: true,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  private emailOptions = {
    from: process.env.MAIL_USER,
  };

  async sendConfirmEmail(email: string, verifToken: string) {
    await this.transporter.sendMail({
      ...this.emailOptions,
      subject: "Email verification",
      to: email,
      html: `<a href="${process.env.BASE_URL_FRONTEND}/confirm/${verifToken}">Click to verify</a>`,
    });
  }

  async sendConfirmResetPassword(email: string, resetPassToken: string) {
    await this.transporter.sendMail({
      ...this.emailOptions,
      subject: "Password Reset",
      to: email,
      html: `<a href="${process.env.BASE_URL_FRONTEND}/resetpassword/${resetPassToken}">Click to reset your password</a>`,
    });
  }
}

const mailService = new MailService();
export default mailService;
