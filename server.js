const uploadFolder = './uploads/';
const express = require('express')
const app = express()
const multer = require('multer')
const upload = multer({ dest: uploadFolder })
const port = process.env.PORT || 8080
const fs = require('fs')
app.use(express.static('public'))

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

app.post('/upload', upload.single('file'), function (req, res) {
  const file = req.file
  const size = file.size
  fs.unlink(uploadFolder + file.filename)
  res.json({
    size: size
  })
})

const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
