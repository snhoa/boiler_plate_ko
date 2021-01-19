const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } =require("./models/User"); 

//aplication/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//aplication/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
  useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(() => console.log('mongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요 존나 어렵네 씨발 진짜 ㅈ같이 어려워 씨발')
})

app.post('/register', (req, res) => {
    // 회원 가입 할떄 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다.

    const user = new User(req.body);
    
    user.save((err, userInfo) => {
      if(err) return res.json({ success: false, err})
      return res.status(200).json({
        success: true
      })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})