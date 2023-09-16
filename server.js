const express = require("express");
const app = express();
const fetchThreadsData = require('./index');

const PORT = process.env.PORT || 3001;


app.use(express.static("public"));
app.use('/route', fetchThreadsData); 

app.listen(PORT, (error) => {
      console.log("listening on " + PORT + "...");
  });
