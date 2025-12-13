const nodemailer = require("nodemailer");
const crypto = require("crypto");
function generateOtp() {
  const otp = crypto.randomInt(0, 1_000_000).toString().padStart(6, "0");

  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

  return { otp, hashedOtp };
}
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.NODE_MAILER_USER,
    pass: process.env.NODE_MAILER_PASS,
  },
});

const generateOtpWithEmail = async (email) => {
  console.log(email);
  // Create a test account or replace with real credentials.

  //   const otp = crypto.randomInt(100000, 1000000);
  // range shrinks as less than 100000 will not bethere and not string
  const { otp, hashedOtp } = generateOtp();
  const info = await transporter.sendMail({
    from: '"sinNsnack',
    to: email,
    subject: "Otp verifaction for sipNsnack",
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    html: `
        <p>Your OTP is</p>
        <h2>${otp}</h2>
        <p>This code is valid for 5 minutes.</p>
      `,
  });
  console.log(info);
  return info;
};
// const phoneNumber = getPhoneNumberFromUserInput();
const verifyOtpWithFirebase = (code) => {};
module.exports = { generateOtpWithEmail, verifyOtpWithFirebase };
