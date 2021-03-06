'use strict';
/////////////////////////////////////////
/// App dependencies ///////////////////
///////////////////////////////////////
const express = require('express');
const app = express();

//////////////////////////////////////////
///// error route or bad request /////////
//////////////////////////////////////////
const notFoundHandler = require('./ error-handlers/404.js');
const errorHandler = require('./ error-handlers/500.js');



const logger = require('./middleware/logger.js');
const validator = require('./middleware/validator.js');


//////////////////////////////////////////
/////////    App setup   ////////////////
////////////////////////////////////////
app.use(express.json());
app.use(logger);

//////////////////////////////////////////
//// home route  ////////////////////////
////////////////////////////////////////
app.get('/',(req,res)=>{
  res.send('Welcome to My App');
});


/////localhost:3000/person?name=
//////////////////////////////////////////
//// person middlware ///////////////////
////////////////////////////////////////
app.get('/person',validator,(req,res)=>{
  res.json({
    name:req.query.name,
  });
});


app.use('*',notFoundHandler);
app.use(errorHandler);


////////////////////////////////////
///// liseting to the server ///////
///////////////////////////////////
function start(PORT){
  app.listen(PORT,()=>{
    console.log(`Listening on port: ${PORT}`);
  });
}


//////////////////////////////////////////
// export the server and start of listening
//////////////////////////////////////////
module.exports = {
  app : app,
  start: start,
};