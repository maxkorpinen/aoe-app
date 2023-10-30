//const exporess = require('express')
console.log("parkettitesti")
const fs = require('fs')
var obj = JSON.parse(fs.readFileSync('../result.json', 'utf8'));
console.log(obj['aztecs']['hindustanis'] / (obj['aztecs']['hindustanis']+obj['hindustanis']['aztecs']))
console.log(obj['hindustanis']['aztecs']," ...  " ,obj['aztecs']['hindustanis'])
/* const {spawn} = require('child_process')
const py = spawn('python', ['hello.py'])

py.stdout.on('data', function(data){
  console.log('pimpum')
})

py.on('close',(code)=> {
  console.log("pumpum")
}) */