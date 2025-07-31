const nodemailer = require('nodemailer');

// כאן שימי את כתובת הג'ימייל שלך וסיסמת אפליקציה
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '6742514@gmail.com',
    pass: 'wogy vnqo yert xlpj    '  // נלמד איך מקבלים את זה בשלב 5
  }
});

async function sendEmailToDonor(to, name, message) {
  const mailOptions = {
    from: ' - "מערכת התרומות" <6742514@gmail.com>',
    to: to,
    subject: 'הקדשה טופלה',
    text: `שלום ${name},\n\nההקדשה שלך טופלה:\n"${message}"\n\nתודה על תרומתך!`
  };

  await transporter.sendMail(mailOptions);
}

async function sendThankYouEmail(to, name) {
  const mailOptions = {
    from: ' - "מערכת התרומות" <6742514@gmail.com>',
    to: to,
    subject: 'תודה על תרומתך!',
    text: `שלום ${name},\n\nתודה רבה על תרומתך למערכת התרומות! \n\nמאחלים לך כל טוב.`
  };
  console.log(mailOptions.from, mailOptions.to, mailOptions.subject, mailOptions.text)
  await transporter.sendMail(mailOptions);
}

module.exports = {
  sendEmailToDonor,
  sendThankYouEmail
};