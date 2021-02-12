const nodemailer = require('nodemailer')

class Util {

  static montarListasExclusaoInclusao(listaFront, listaBack) {
    let listaParaExcluir = [];
    let listaParaIncluir = [];

    if (listaFront.length === 0 && listaBack.length !== 0) {
      listaParaExcluir = listaBack;
    } else {
      let listaBackOrdenada = listaBack.sort(Util.ordenerListaPeloNome);
      let litaFrontOrdenada = listaFront.sort(Util.ordenerListaPeloNome);
      listaBackOrdenada.forEach(back => {
        if (!litaFrontOrdenada.find(front => back.nome === front.nome)) {
          listaParaExcluir.push(back);
        }
      });
    }
  
    if (listaBack.length === 0 && listaFront.length !== 0) {
      listaParaIncluir = listaFront;
    } else {
      let listaBackOrdenada = listaBack.sort(Util.ordenerListaPeloNome);
      let litaFrontOrdenada = listaFront.sort(Util.ordenerListaPeloNome);
      litaFrontOrdenada.forEach(back => {
        if (!listaBackOrdenada.find(front => back.nome === front.nome)) {
          listaParaIncluir.push(back);
        }
      });
    }
    return { listaExcluir: listaParaExcluir, listaIncluir: listaParaIncluir };
  }
  static ordenerListaPeloNome(itemA, itemB) {
    return itemA.nome.toLowerCase().localeCompare(itemB.nome.toLowerCase());
  }

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
