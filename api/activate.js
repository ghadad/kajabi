const Axios = require("axios");

let hooks = {};
Object.keys(process.env).forEach(k => {
    if (k.match(/K\d/))
        hooks[k] = process.env[k];
})

module.exports = async (req, res) => {

    let icountSecret = req.headers['X-iCount-Secret'] || req.headers['x-icount-secret'];

    if (icountSecret !== process.env.ICOUNT_SECRET)
        return res.status(401).send({
            error: "invalid icount secret",
            headers: req.headers
        });
    if (!req.body.sku)
        return res.status(401).send({
            error: "missing sku"
        });
    if (!req.body.email)
        return res.status(401).send({
            error: "missing email"
        });
    if (!req.body.name)
        return res.status(401).send({
            error: "missing name"
        });

    let webhook = hooks[req.body.sku]
    if (!webhook)
        return res.status(401).send({
            error: "Cannot find proper webhook for sku : " + req.body.sku
        });

    let whr = await Axios.post(webhook, {
        email: req.body.email,
        name: req.body.name
    });
    console.log(whr)
    /* res.json({
        hooks:hooks,
        headers: req.headers,
        body: req.body,
        query: req.query,
        cookies: req.cookies,
    })
    */

    res.json({
        data:whr.data,
        success: true
    })
}