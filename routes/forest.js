module.exports = forest;


function forest(app, Forest, rndstring){

  app.post('/forest/write', async(req,res)=>{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
       dd='0'+dd
    } 
    if(mm<10) {
        mm='0'+mm
    } 
    today = yyyy+mm+dd;
    var forest = new Forest(req.body);
    if(forest.isNameHide === true){
        forest.hidedName = forest.name;
        forest.name = "익명";
        console.log("changed")
    }
    let listNum = await Forest.find()
    listNum = listNum.length;
    forest.docNum = listNum + 1;
    forest.forestToken =  rndstring.generate(23);
    forest.date = today;
    var resultforest = await forest.save();    
    if(!resultforest.ok) res.status(200).json(forest);
    else res.status(500).json({message : "fail!"});
  })

  .post('/forest/read', async(req,res)=>{
    let result = await Forest.find().sort({ docNum : -1 });
    let list = [];
    for (var i=0; result[i] != null; i++) {
        let json = {
            title : result[i].title,
            subTitle:result[i].subTitle,
            name : result[i].name,
            date: result[i].date,
            content: result[i].content,
            docNum : result[i].docNum,
            isNameHide : result[i].isNameHide,
            forestToken : result[i].forestToken
        }

        list.push(json)
    }
    return res.status(200).json({list : list})
  })

  .post('/forest/search/:title', async(req,res)=>{
    let result = await Forest.find({title : {$regex: req.params.title, $options:"$i"}})
    let list = []
    let forestNum = 1;
    for( var i = 0; result[i] != null; i++) {
        let json = {
            title : result[i].title,
            subTitle:result[i].subTitle,
            name : result[i].name,
            date: result[i].date,
            content: result[i].content,
            docNum : result[i].docNum,
            isNameHide : result[i].isNameHide,
            forestToken : result[i].forestToken
        }
        forestNum++;
        list.push(json)
    }
    return res.status(200).json({list : list})
})

}
