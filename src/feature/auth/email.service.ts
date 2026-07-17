
import { transporter } from "../../lib/mail";

// export async function sendVerificationEmail(
//   email: string,
//   token: string,
// ) {
//   const url = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

//   await transporter.sendMail({
//     from: process.env.EMAIL_FROM,
//     to: email,
//     subject: "Verify your email",
//     html: `
//       <h1>Email Verification</h1>

//       <p>Click the button below.</p>

//       <a href="${url}">
//         Verify Email
//       </a>
//     `,
//   });
// }



// console.log(process.env.SMTP_HOST);
// console.log(process.env.SMTP_PORT);
// console.log(process.env.SMTP_USER);
// console.log(transporter.options);

// async function testConnection() {
//   try {
//     await transporter.verify();
//     console.log("✅ SMTP connection successful!");
//   } catch (error) {
//     console.error("❌ SMTP connection failed:", error);
//   }
// }

// testConnection();


async function sendTestEmail() {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: "3ray.causaren@gmail.com", // replace with your email
      subject: "🚀 Testing Nodemailer",
      text: "Hello! This is my first email sent from my Express app.",
      html: `
        <h1>Hello Janray 👋</h1>
        <p>This is my first email using Nodemailer.</p>
      `,
    });

    console.log("✅ Email sent!");
    console.log(info);
  } catch (error) {
    console.error(error);
  }
}

sendTestEmail();