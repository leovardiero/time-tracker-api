class HomeController {
  async index(req, res) {
    res.json('Time Timer API - Version 0.0.1');
  }
}

export default new HomeController();
