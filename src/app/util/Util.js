const nodemailer = require('nodemailer')

class Util {

  montarMensagemJson(mensagem) {
    return { mensagem: mensagem }
  }

  isEmpty(val) {
    if (val instanceof Object) {
      return Object.keys(val).length === 0
    }
    return (val === undefined || val == null || val.length <= 0) ? true : false
  }

  enviarEmail() {
    let emailOrigiem = process.env.EMAIL
    let senha = process.env.SENHA_EMAIL
    let emailDestino = 'jairmaiay@yahoo.com.br'
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: emailOrigiem,
        pass: senha,
      },
    })
    var mailOptions = {
      from: emailOrigiem,
      to: emailDestino,
      subject: 'Sending Email using Node.js',
      text: 'That was easy!',
      html:
        '<div><h1>Título</h1><p>Corpo do texto para envio de mensagens</p></div>',
    }
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
  }
}

module.exports = new Util()
