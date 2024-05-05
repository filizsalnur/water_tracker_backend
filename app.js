const http = require('http');
const mongoose = require('mongoose');
const express = require('express');
const WaterConsume=require('./models/trackerModels')
 const UserTarget=require('./models/userTarget')


const port = 4000;
const app = express();
app.use(express.json());


const dbURI="mongodb+srv://aykhan:68720103@nodetuts.pjavkkd.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(dbURI)
  .then((result) => {
    console.log('connected to db');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })


  app.post('/waterConsume', async (req, res) => {
    try {
        let waterConsume = await WaterConsume.findOne({ date: req.body.date });

        if (waterConsume) {
            waterConsume.amount += req.body.amount;
            waterConsume = await waterConsume.save();
            res.status(200).send(waterConsume.toObject()); // Convert to plain JavaScript object
        } else {
            waterConsume = new WaterConsume(req.body);
            waterConsume = await waterConsume.save();
            res.status(302).send(waterConsume.toObject()); // Convert to plain JavaScript object
        }
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

app.get('/getConsumedAmount', async(req,res)=>{
    try{
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        const formattedDate = date.toISOString().slice(0, 10);
        const waterConsume = await WaterConsume.findOne({ date: formattedDate });
        if(waterConsume){
            res.status(200).send(waterConsume.toObject());
        }
        else{
            res.status(404).send({message: "No record found"});
        }

    }
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }
})


  app.post ('/userTarget', async (req,res)=>{
    const userTarget = new UserTarget(req.body);
    try {
      const result = await userTarget.save();
      res.status(200).send(result);
    } catch (err) {
        res.status(400).send(err);
    }});
 