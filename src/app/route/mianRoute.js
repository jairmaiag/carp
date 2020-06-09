module.exports = function (app) {
  const controller = new app.src.app.controller.main.MainController(app);
  app.get("/", function (req, res) {
    controller.index(req, res);
  });
};
