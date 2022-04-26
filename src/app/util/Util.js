const nodemailer = require('nodemailer');

class Util {
  static async ordenerListaPeloNome(itemA, itemB) {
    const ita = itemA.nome.toLowerCase();
    const itb = itemB.nome.toLowerCase();
    return ita.localeCompare(itb);
  }

  async montarListasExclusaoInclusao(listaFront, listaBack) {
    const retorno = { listaExcluir: [], listaIncluir: [] };
    if (listaFront.length === 0 && listaBack.length !== 0) {
      retorno.listaExcluir = listaBack;
    } else {
      const listaBackOrdenada = listaBack.sort(this.ordenerListaPeloNome);
      const litaFrontOrdenada = listaFront.sort(this.ordenerListaPeloNome);
      listaBackOrdenada.forEach((back) => {
        if (!litaFrontOrdenada.find((front) => back.nome === front.nome)) {
          retorno.listaExcluir.push(back);
        }
      });
    }

    if (listaBack.length === 0 && listaFront.length !== 0) {
      retorno.listaIncluir = listaFront;
    } else {
      const listaBackOrdenada = listaBack.sort(this.ordenerListaPeloNome);
      const litaFrontOrdenada = listaFront.sort(this.ordenerListaPeloNome);
      litaFrontOrdenada.forEach((back) => {
        if (!listaBackOrdenada.find((front) => back.nome === front.nome)) {
          retorno.listaIncluir.push(back);
        }
      });
    }
    return retorno;
  }

  capitular(palavra) {
    return palavra.charAt(0).toUpperCase() + palavra.slice(1);

  }

  montarMensagemJson(mensagem) {
    return { mensagem };
  }

  isEmpty(val) {
    if (val instanceof Object) {
      return Object.keys(val).length === 0;
    }
    return !!((val === undefined || val == null || val.length <= 0));
  }

  enviarEmail() {
    const emailOrigiem = process.env.EMAIL;
    const senha = process.env.SENHA_EMAIL;
    const emailDestino = 'jairmaiay@yahoo.com.br';
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: emailOrigiem,
        pass: senha,
      },
    });
    const mailOptions = {
      from: emailOrigiem,
      to: emailDestino,
      subject: 'Sending Email using Node.js',
      text: 'That was easy!',
      html:
        '<div><h1>Título</h1><p>Corpo do texto para envio de mensagens</p></div>',
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  }
}

module.exports = new Util();
