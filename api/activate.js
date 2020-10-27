const Axios = require("axios");

module.exports = (req, res) => {
    res.json({
      body: req.body,
      query: req.query,
      cookies: req.cookies,
    })
  }