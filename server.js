
const express = require('express')
const app = express()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const port = process.env.PORT || 8080
const fs = require('fs')
app.use(express.static('public'))

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

const deleteFolderRecursive = function (path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      var curPath = path + "/" + file
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath)
      } else { // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}

app.post('/upload', upload.single('file'), function (req, res) {
  const size = req.file.size
  deleteFolderRecursive('./uploads')
  res.json({
    size: size
  })
})


const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
