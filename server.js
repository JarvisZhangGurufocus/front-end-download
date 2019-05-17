const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const fs = require('fs')
const bodyParser = require('body-parser')

/** READ FILE */
let filePath = path.join(__dirname,'./dist/index.html')
let fileContent = ''
const readFile = function () {
  return new Promise((resolve, reject) => {
    if (fileContent) {
      resolve(fileContent)
    } else {
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          return reject(err)
        }
        fileContent = data
        resolve(data)
      })
    }
  })
}

/** SERVER */
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'./dist/')))

app.post('/', async function (req, res, next) {
  let data = req.body ? JSON.stringify(req.body) : data
  let html = await readFile()

  html = html.replace('</body>', `<div id="server-data" style="display: none">${data}</div></body>`)

  res.send(html)
})

http.createServer(app).listen(3333)