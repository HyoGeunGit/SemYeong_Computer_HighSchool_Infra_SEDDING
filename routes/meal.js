module.exports = meal;


function meal(app, request){

  app.get('/meal', async(req,res)=>{
    const url = 'https://schoolmenukr.ml/api/high/B100000659';
        let result = request(url, (err, response, body)=>{
            var json = JSON.parse(body);
            //  console.log(body)
            var jsonresult = res.status(200).json({meal: json})
            console.log(jsonresult)
        })
    })
}
