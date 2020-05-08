const request = require('request');
const fs = require('fs');
const { isProvinceId, getAreaGrade, getProvinceId, isCountryId } = require('./util.js')
const { AreaGrade } = require('./enumApi')
const { sleep } = require('./util');

const BASE_URI = 'https://geo.datav.aliyun.com/areas_v2/bound/'

async function downLoadFile(areaId) {
    // await sleep(1000)
    //https://geo.datav.aliyun.com/areas_v2/bound/140100_full.json
    /**
     * 省市地图文件的path都会带_full,区县的就不会带_full了
     */
    const fileUri = creatFileUri(areaId);
    let filePath = isCountryId(areaId) ? `./${areaId}.json` : `./${getProvinceId(areaId)}/${areaId}.json`
    // if (isProvinceId(areaId)) {
    await createDir(getProvinceId(areaId))
    // }
    var stream = fs.createWriteStream(filePath, { autoClose: true });
    return new Promise((resolve, reject) => {
        request(fileUri).pipe(stream).on('close', () => {
            // console.log(`${areaId}下载成功！`)
            resolve(areaId);
        }).on('error', (err) => {
            // console.log(`${areaId}下载失败！`)
            reject(err);
        });
    })
}

function createDir(dirPath) {
    dirPath = dirPath + '';
    let exist = fs.existsSync(dirPath)
    if (!exist) {
        fs.mkdirSync(dirPath);
    }
    return Promise.resolve();
}

function creatFileUri(areaId) {
    let areaKey = getAreaGrade(areaId);
    if (AreaGrade[areaKey].value > AreaGrade.CITY.value) {
        return `${BASE_URI}${areaId}.json`
    } else {
        return `${BASE_URI}${areaId}_full.json`
    }
}
module.exports = {
    downLoadFile
}