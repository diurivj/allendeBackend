const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const transporter = nodemailer.createTransport({
    //host: 'smtp.gmail.com',
    //port: 587,
    //secure: true, // true for 465, false for other ports
    service: 'gmail',
    auth: {
        user: process.env.emailUser, // generated ethereal user
        pass: process.env.emailPass // generated ethereal password
    }
});


    // setup email data with unicode symbols
let mailOptions = {
        from: '"BlisS 👻" <fixtergeek@gmail.com>', // sender address
        to: 'bliss@ironhack.com', // list of receivers
        subject: 'Te han invitado a ser parte de Allende ✔', // Subject line
        text: 'Hola', // plain text body
        //html: `<b>Da click aquí para crear tu session: </b> ${token}` // html body
    };

function genToken(user){
    const token = jwt.sign({
        sub: user._id,
        username: user.email
    }, 
    "bliss", 
    {expiresIn:"72 hours"} //si no lo pones no expira
);
    mailOptions.html = `
        <b>Da click aquí para crear tu session: </b>
        <a href="http://localhost:3000/invitation?token=${token}"> ${token} </a>
        `;
    mailOptions.to = user.email;
    User.findByIdAndUpdate(user._id, {tokenToActive:token})
    .then(user=>token)
    .catch(e=>console.log(e));
    
}

exports.sendInvitation = (user)=>{
    genToken(user);
    transporter.sendMail(mailOptions, (error, info) => {
        console.log(info)
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
}

