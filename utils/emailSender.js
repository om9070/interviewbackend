const nodemailer = require('nodemailer');

exports.getemail = async (email) => {

    return new Promise(async (resolve, reject) => {
    try {
        // const { email } = req.body;
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_FOR_NODEMAILER,
                pass: process.env.PASSWORD_FOR_NODEMAILER
            }
        });

        let mailDetails = {
            from: process.env.EMAIL_FOR_NODEMAILER,
            to: email,
            subject: 'Test mail',
            text: 'Node.js testing mail for happnow'
        };

        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                reject("error found")
                console.log('Error Occurs', err);
            } else {
               console.log({ message: "Email sent successfully", status: true })
               resolve("email sending is procced")
            }
        });
    } catch (e) {
        console.log("email message error", e);
        reject("Error sending email");
    }
})
}