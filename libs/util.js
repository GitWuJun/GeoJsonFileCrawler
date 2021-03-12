const BASE_URI = 'https://geo.datav.aliyun.com/areas_v2/bound/'
const ROOTPATH = 'map/'
const { getEnumKey, AreaGrade } = require('./enumApi')
const request = require('request');

const fs = require('fs')

function isProvinceId(id) {
    return Number.isInteger(id / 10000) && (id + '').length === 6;
}

function isCityId(id) {
    return Number.isInteger(id / 100) && (id + '').length === 6;
}

function isCountyId(id) {
    return (id + '').length === 6 && !isProvinceId(id) && !isCityId(id);
}

function isCountryId(id) {
    return (id + '').length !== 6;
}

function isStreetId(id) {
    return (id + '').length === 12 && Number.isInteger(id / 1000);
}

function isVillageId(id) {
    return (id + '').length === 12 && !isStreetId(id);
}

/**
 * 获取父级的id
 * @param id
 * @returns {string|*[]|number}
 */
function getParentId(id) {
    let str = id + '';
    if (str.length === 6) {
        if (str.endsWith('0000')) {
            return 86;
        } else if (str.endsWith('00')) {
            return parseFloat(str.substr(0, 2) + '0000');
        } else {
            return parseFloat(str.substr(0, 4) + '00');
        }
    } else if (str.length > 6) {
        if (str.endsWith('000')) {
            return parseFloat(str.substr(0, 6));
        } else {
            return parseFloat(str.substr(0, 9) + '000');
        }
    } else {
        return 0;
    }
}

function getProvinceId(id) {
    if (id && id !== 86) {
        return (id + '').substring(0, 2) + '0000'
    }
    return id;
}

/**
 * 根据id获取行政等级
 * @param id
 * @returns {undefined}
 */
function getAreaGrade(id) {
    if (id) {
        if (isProvinceId(id)) {
            return getEnumKey(AreaGrade, AreaGrade.PROVINCE.value);
        } else if (isCityId(id)) {
            return getEnumKey(AreaGrade, AreaGrade.CITY.value);
        } else if (isStreetId(id)) {
            return getEnumKey(AreaGrade, AreaGrade.STREET.value);
        } else if (isVillageId(id)) {
            return getEnumKey(AreaGrade, AreaGrade.VILLAGE.value);
        } else if (isCountryId(id)) {
            return getEnumKey(AreaGrade, AreaGrade.COUNTRY.value);
        } else if (isCountyId(id)) {
            return getEnumKey(AreaGrade, AreaGrade.COUNTY.value);
        }
    }
}

function creatFileUri(areaId) {
    let areaKey = getAreaGrade(areaId);
    if (AreaGrade[areaKey].value > AreaGrade.CITY.value) {
        return `${BASE_URI}${areaId}.json`
    } else {
        return `${BASE_URI}${areaId}_full.json`
    }
}

function createDir(dirPath) {
    dirPath = ROOTPATH + dirPath + '';
    let exist = fs.existsSync(dirPath)
    if (!exist) {
        fs.mkdirSync(dirPath);
    }
    return Promise.resolve();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//从命令行中获取输入的areaid
function getCliAreaId() {
    let areaid = process.argv.slice(2).pop()
    if (!areaid || areaid.length !=6) {
        console.log('请输入正确的区域id!')
    } else if (Number.isInteger(Number(areaid))) {
        targetAreaId = areaid;
        return targetAreaId;
    } else {
        console.error('参数错误！')
    }
}

function requestData(url) {
    return new Promise((resolve, reject) => {
        request(url,(err,res) => {
            if(err){
                reject(err)
            }else{
                try {
                    resolve(JSON.parse(res.body))       
                } catch (error) {
                    reject(error)
                }
            }
        })
    })
}

module.exports = {
    isProvinceId,
    isCountryId,
    getAreaGrade,
    getProvinceId,
    sleep,
    creatFileUri,
    createDir,
    BASE_URI,
    ROOTPATH,
    requestData,
    getCliAreaId
}
