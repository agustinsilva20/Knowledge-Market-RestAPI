const nodemailer = require('nodemailer');





const sendMail = async (email, subject, text) => {
    try {
            console.log("enviado email a " + email)
             const transporter = nodemailer.createTransport({
                service: 'gmail',
                 auth: {
                    user: "knowledgemarkt@gmail.com",
                     pass: "zumo pzof fzox hpaa",
                 },
             });
    
             const mailOptions = {
                 from: "knowledgemarkt@gmail.com",
                 to: email,
                 subject,
                 text,
             };
    
             const info = await transporter.sendMail(mailOptions);
             console.log(`Email sent: ${info.response}`);
         } catch (error) {
             console.log(error);
         }
     }

     module.exports = {
        sendMail,
    };