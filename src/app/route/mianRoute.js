const PDFDocument = require("pdfmake")

module.exports = function (app) {
  const controller = new app.src.app.controller.main.MainController(app)

  const validaCampos = function (dados) {
    if (dados.host === undefined) {
      return false
    }
    if (dados.porta === undefined) {
      return false
    }
    if (dados.banco === undefined) {
      return false
    }
    if (dados.usuario === undefined) {
      return false
    }
    if (dados.senha === undefined) {
      return false
    }
    return true
  }

  app.get("/", function (req, res) {
    controller.index(req, res)
  })

  app.get("/criarbanco", function (req, res) {
    res.status(200).send(
      'Passe os dados utilizando o method POST, no formato json como abaixo: <br />{<br />"host":"enderecoBanco", <br />"porta":5432, <br />"banco":"postgres",<br />"usuario":"postgres", <br />"senha":"senhaBanco" <br />} <br />Substituindo os dados para a conexão com o banco padrão do Postgres.')
  })

  app.post("/criarbanco", async function (req, res) {
    if (!validaCampos(req.body)) {
      res.status(400).json({
        mensagem:
          "Formato esperado como no exemplo: {\"host\":'enderecoBanco', 'porta':5432,'banco':'postgres','usuario':'postgres','senha':'senhaBanco'} - Substituindo as aspas simples por aspas duplas.",
      })
      return
    }

    await controller.criarBanco(req.body)

    res.status(200).json({
      mensagem: "Verifique o console do nodejs para ver os resultados.",
    })
  })

  app.get("/teste.pdf", function (req, res) {
    var fonts = {
      Roboto: {
        normal: "src/assets/fonts/Roboto-Regular.ttf",
        bold: "src/assets/fonts/Roboto-Medium.ttf",
        italics: "src/assets/fonts/Roboto-Italic.ttf",
        bolditalics: "src/assets/fonts/Roboto-MediumItalic.ttf",
      },
    }
    var docDefinition = {
      info: {
        title: "Teste de geração de PDF",
        author: "Jair",
        subject: "Primeiro PDF",
        keywords: "PDF",
      },
      content: [
        "First paragraph",
        "Second paragraph, this time a little bit longer",
        { text: "Third paragraph, slightly bigger font size", fontSize: 20 },
        { text: "Another paragraph using a named style", style: "header" },
        { text: ["playing with ", "inlines"] },
        { text: ["and ", { text: "restyling ", bold: true }, "them"] },
      ],
      styles: {
        header: { fontSize: 30, bold: true },
      },
    }
    const doc = new PDFDocument(fonts)
    const pdfDoc = doc.createPdfKitDocument(docDefinition)
    pdfDoc.pipe(res)
    pdfDoc.end()
  })
}
