const PDFDocument = require("pdfmake")

module.exports = function (app) {

  app.get("/teste.pdf", function (req, res) {
    try {
      var fonts = {
        Roboto: {
          normal: "src/app/assets/fonts/Roboto-Regular.ttf",
          bold: "src/app/assets/fonts/Roboto-Medium.ttf",
          italics: "src/app/assets/fonts/Roboto-Italic.ttf",
          bolditalics: "src/app/assets/fonts/Roboto-MediumItalic.ttf",
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
    } catch (error) {
      res.status(400).json({
        mensagem: 'Erro ao criar o PDF.',
        error
      })
    }
  })
}
