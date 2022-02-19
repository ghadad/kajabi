
const axios = require("axios");

const url = "https://api.tapfiliate.com/1.6";

let config =  {
    headers: {
        'content-type': 'application/json',
        'Api-Key': process.env.TAPAFI_API_KEY 
    }
}
 



const addConversion = async function(refcode,externalId,amount) { 
    
  //  let info = await getClickId(refcode);
  //  console.log("id:",id)
  try { 
    let data = await axios.post(url+"/conversions/",{external_id:externalId,amount:amount,referral_code:refcode},config);
    console.log("tapfiliate data:",data)
    return data;
  } catch(e) {
      console.error("tapfiliate error:",e.response.data)
  }

}

module.exports =  { 
    addConversion
}


