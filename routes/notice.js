module.exports = noitce;


function noitce(app, Notice, rndstring){

  app.post('/notice/write', async(req,res)=>{
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
    var notice = new Notice(req.body);
    let listNum = await Notice.find()
    listNum = listNum.length;
    notice.docNum = listNum + 1;
    notice.noticeToken =  rndstring.generate(23);
    notice.date = today;
    var resultnotice = await notice.save();    
    if(!resultnotice.ok) res.status(200).json(notice);
    else res.status(500).json({message : "fail!"});
  })

  .post('/notice/read', async(req,res)=>{
    let result = await Notice.find().sort({ docNum : -1 });
    let list = [];
    for (var i=0; result[i] != null; i++) {
        let json = {
            title : result[i].title,
            subTitle:result[i].subTitle,
            name : result[i].name,
            date: result[i].date,
            content: result[i].content,
            docNum : result[i].docNum,
            noticeToken : result[i].noticeToken
        }

        list.push(json)
    }
    return res.status(200).json({list : list})
  })

  .post('/notice/search/:title', async(req,res)=>{
    let result = await Notice.find({title : {$regex: req.params.title, $options:"$i"}})
    let list = []
    let noticeNum = 1;
    for( var i = 0; result[i] != null; i++) {
        let json = {
            title : result[i].title,
            subTitle:result[i].subTitle,
            name : result[i].name,
            date: result[i].date,
            content: result[i].content,
            docNum : result[i].docNum,
            isNameHide : result[i].isNameHide,
            noticeToken : result[i].noticeToken
        }
        noticeNum++;
        list.push(json)
    }
    return res.status(200).json({list : list})
})

}
