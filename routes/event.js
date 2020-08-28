module.exports = event;


function event(app, Event, rndstring){

  app.post('/event/write', async(req,res)=>{
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
    var event = new Event(req.body);
    let listNum = await Event.find()
    listNum = listNum.length;
    event.docNum = listNum + 1;
    event.eventToken =  rndstring.generate(23);
    event.date = today;
    var resultevent = await event.save();    
    if(!resultevent.ok) res.status(200).json(event);
    else res.status(500).json({message : "fail!"});
  })

  .post('/event/read', async(req,res)=>{
    let result = await Event.find().sort({ docNum : -1 });
    let list = [];
    for (var i=0; result[i] != null; i++) {
        let json = {
            title : result[i].title,
            subTitle:result[i].subTitle,
            name : result[i].name,
            date: result[i].date,
            content: result[i].content,
            docNum : result[i].docNum,
            agency: result[i].agency,
            eventToken : result[i].eventToken
        }

        list.push(json)
    }
    return res.status(200).json({list : list})
  })

  .post('/event/search/:title', async(req,res)=>{
    let result = await Event.find({title : {$regex: req.params.title, $options:"$i"}})
    let list = []
    let eventNum = 1;
    for( var i = 0; result[i] != null; i++) {
        let json = {
            title : result[i].title,
            subTitle:result[i].subTitle,
            name : result[i].name,
            date: result[i].date,
            content: result[i].content,
            docNum : result[i].docNum,
            agency: result[i].agency,
            eventToken : result[i].eventToken
        }
        eventNum++;
        list.push(json)
    }
    return res.status(200).json({list : list})
})

}
