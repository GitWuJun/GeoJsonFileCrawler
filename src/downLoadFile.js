
const fs = require('fs');
const { getProvinceId, isCountryId } = require('../libs/util.js')
const { creatFileUri,createDir,ROOTPATH} = require('../libs/util');
const request = require('request')
async function downLoadFile(areaId) {
    // await sleep(1000)
    //https://geo.datav.aliyun.com/areas_v2/bound/140100_full.json
    /**
     * 省市地图文件的path都会带_full,区县的就不会带_full了
     */
    const fileUri = creatFileUri(areaId);
    let filePath = ROOTPATH + (isCountryId(areaId) ? `./${areaId}.json` : `./${getProvinceId(areaId)}/${areaId}.json`)
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

module.exports = {
    downLoadFile
}