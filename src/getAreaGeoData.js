/**
 * 获取被处理后的地区json数据
 */

const { creatFileUri, requestData, getCliAreaId } = require('../libs/util');
const parseGeoData = require('./parseGeoData');

async function getAreaGeoData() {
    let areaId = getCliAreaId();
    let uri = creatFileUri(areaId)
    let res = await requestData(uri)
    return parseGeoData(res).filter(v => v.name)
}

module.exports = getAreaGeoData;

(async() => {
    let res = await getAreaGeoData()
    console.log(res)
})()