const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express(); // create the app
const port =  process.env.PORT || 3000; // default

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/time', (req, res) => {
    // date object
    const date = new Date()
    fs.writeFileSync("current date-time.txt",`${date}`)
    const data = fs.readFileSync('current date-time.txt','utf8');
    console.log('data:', data)
    return res.render("index", {data})
})


app.get('/allFile', (req, res) => {
    const files = {}
    
    const directoryPath = path.join(__dirname, './dummyText');

    fs.readdirSync(directoryPath).forEach(file => {
        if(file.endsWith('.txt')){
        const date = new Date()
        const basePath = path.join(__dirname, './dummyText/', file);
        fs.writeFileSync(basePath,`${date}`)
        const info = fs.readFileSync(basePath,'utf8');
        files[file] = {infoInside:info, fileType: 'text/plain'};
        }
      });
      const data = JSON.stringify(files)
    return res.render('file', {data})

})  


app.listen(port, ()=>{console.log("listening on port " + port)})