const fs = require('fs')
const { getAreaGrade,getProvinceId,isCountryId } = require('../libs/util')
const parseGeoData = require('./parseGeoData')
const { AreaGrade } = require('../libs/enumApi')
const ROOTPATH = 'map/'

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
        let filePath = ROOTPATH + (isCountryId(areaId)?`./${areaId}.json`:`./${getProvinceId(areaId)}/${areaId}.json`)
        let fileObj = readFile(filePath)
        let areaList = parseGeoData(fileObj)
        return Promise.resolve(areaList);
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = {
    parseFile
}
