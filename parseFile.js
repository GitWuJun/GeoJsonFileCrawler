const fs = require('fs')
const { getAreaGrade,getProvinceId,isCountryId } = require('./util')
const { AreaGrade } = require('./enumApi')

function readFile(filePath) {
    let exit = fs.existsSync(filePath);
    if (exit) {
        let fileBuffer = fs.readFileSync(filePath);
        let obj = JSON.parse(fileBuffer.toString());
        return obj;
    } else {
        console.log(`文件${filePath}不存在`)
        return null
    }
}

function parseFile(areaId) {
    try {
        let filePath = isCountryId(areaId)?`./${areaId}.json`:`./${getProvinceId(areaId)}/${areaId}.json`
        let fileObj = readFile(filePath)
        if (fileObj) {
            let features = fileObj.features;
            let areaList = features.map(item => {
                let properties = item.properties
                return {
                    name: properties.name,
                    areaId: properties.adcode,
                    areaGrade: AreaGrade[getAreaGrade(properties.adcode)]
                }
            })
            return Promise.resolve(areaList);
        }
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = {
    parseFile
}
