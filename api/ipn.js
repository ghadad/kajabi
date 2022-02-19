const Axios = require("axios");

const addConversion = async function(refcode,externalId,amount) { 
    const url = "https://api.tapfiliate.com/1.6";

   let config =  {
        headers: {
            'content-type': 'application/json',
            'Api-Key': process.env.TAPAFI_API_KEY 
        }
   }
 
  try { 
    let data = await axios.post(url+"/conversions/",{external_id:externalId,amount:amount,referral_code:refcode},config);
    console.log("tapfiliate data:",data)
    return data;
  } catch(e) {
      if(e.response){
        console.error("tapfiliate error:",e.response.data);
      }
      consoloe.log(e)
      
  }

}

module.exports = async (req, res) => {
    let params = req.body || {};
    console.log("get activation request %j", req.body);
    if (params.doctype !== "invrec") {
        console.error("params.doctype:", params.doctype)
        return res.json({
            success: true,
            message: "not kajabi transaction"
        })
    }



    let icountSecret = req.headers['X-iCount-Secret'] || req.headers['x-icount-secret'];

    let errors = [];
    if (icountSecret !== process.env.ICOUNT_SECRET) {
        console.error("icountSecret", icountSecret, process.env.ICOUNT_SECRET)
        errors.push("invalid icount secret")
    }

 if (errors.length)
        return res.status(500).send({
            errors: errors
        });

        console.log("report tapfiliate  affref:",params.affref," docnum:",params.docnum," sum:",params.sum);

 
    // add affiliate 
    if(params.affref) {
        try {
            await addConversion(params.affref,params.docnum,params.sum);
        } catch(e) {
            console.error(e);
        }
    }

   
    res.json({
        affref: params.affref,
        sum:params.sum,
        docnum:params.docnum,
        success: true,
        v: 1
    })
}