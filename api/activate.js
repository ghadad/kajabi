const Axios = require("axios");

let  hooks ={};
  Object.keys(process.env).forEach(k =>{
    if(k.match(/K\d/))
    hooks[k] = process.env[k];
})
module.exports = (req, res) => {
    res.json({
      hooks:hooks,
      body: req.body,
      query: req.query,
      cookies: req.cookies,
    })
  }