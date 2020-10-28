const Axios = require("axios");

let hooks = {};
Object.keys(process.env).forEach(k => {
    if (k.match(/K\d/))
        hooks[k] = process.env[k];
})

module.exports = (req, res) => {
    if (req.headers['X-iCount-Secret'] !== process.env.ICOUNT_SECRET)
        return res.status(401).send({
            error: "invalid icount secret",headers:req.headers
        })
    res.json({
        //  hooks:hooks,
        headers: req.headers,
        body: req.body,
        query: req.query,
        cookies: req.cookies,
    })
}