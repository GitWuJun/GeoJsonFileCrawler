const { downLoadAndParse } = require('./app.js')

const areaId = 100000;

(async () => {
    let res = await downLoadAndParse(areaId)
    console.log(res.filter(v=>v.name).length)
    console.log(res)
})()