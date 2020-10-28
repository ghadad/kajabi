const Axios = require("axios");

/* let hooks = {};
Object.keys(process.env).forEach(k => {
    if (k.match(/K\d/))
        hooks[k] = process.env[k];
})
*/

module.exports = async (req, res) => {
    let params = req.body || {};
    console.log("get activation request %j", req.body);
    if (params.doctype !== "invrec" )
        return res.json({
            success: true,
            message: "not kajabi transaction"
        })


let icountSecret = req.headers['X-iCount-Secret'] || req.headers['x-icount-secret'];

let errors = [];
if (icountSecret !== process.env.ICOUNT_SECRET)
    errors.push("invalid icount secret")

if (!req.body.sku)
    errors.push("missing sku")

if (!req.body.email)
    errors.push("missing email")

if (!req.body.name)
    errors.push("missing name")
if (errors.length)
    return res.status(500).send({
        errors: errors
    });


    let items = params.items || []
    let item = items[0] ;

    if(!item)
    return res.status(500).send({
        error:"cannot find course item"
    });

let webhook = `https://checkout.kajabi.com/webhooks/offers/${item.sku}/activate`;
/* if (!webhook)
    return res.status(401).send({
        error: "Cannot find proper webhook for sku : " + req.body.sku
    });
*/

let whr = {};
let errData, errStatus, errMessage;
try {
    whr = await Axios.post(webhook, {
        name: params.clientname ,
        email: params.client.email
    });

} catch (error) {
    if (error.response) {
        // Request made and server responded
        errData = error.response.data;
        errStatus = error.response.status;
    } else if (error.request) {
        // The request was made but no response was received
        console.log("error.request", error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        errMessage = error.message;
    }

};

/* res.json({
    hooks:hooks,
    headers: req.headers,
    body: req.body,
    query: req.query,
    cookies: req.cookies,
})
*/

res.json({
    data: whr.data,
    success: true,
    v: 1,
    errData: errData,
    errStatus: errStatus,
    errMessage: errMessage
})
}