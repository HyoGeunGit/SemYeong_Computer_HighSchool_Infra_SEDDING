module.exports = classdata;


function classdata(app, Users, Schedule, rndstring){

  app.post('/class/dataup', async(req,res)=>{
    var schedule = new Schedule(req.body);
    try{
      var result = await schedule.save();
    }catch(e){
      if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
      if(e instanceof ValidationError) return res.status(400).json({message: e.message});
      if(e instanceof paramsError) return res.status(400).json({message: e.message});
    }
    return res.status(200).json({message : "success!"});
  })

  .post('/class/finddata', async(req,res)=>{
    var result = await Schedule.findOne(req.body);
    if(!result) return res.status(404).json({message : "Scehdule not found!"})
    else return res.status(200).json(result)
  })
}
