const { downLoadFile } = require('./downLoadFile');
const { parseFile } = require('./parseFile');
const async = require('async');
const {getCliAreaId} = require('../libs/util')

let targetAreaId = 0;//

let count = 0;

async function downLoadAllArea(areaId) {
    let areaList = await downLoadAndParse(areaId);

    if (Array.isArray(areaList) && areaList.length > 1) {
        // Promise.all(areaList.map(async area => {
        //     let res = await downLoadAndParse(area.areaId)
        //     for (let i = 0; i < res.length; i++) {
        //         const element = res[i];
        //         await downLoadAllArea(element.areaId)
        //     }
        // }))
        async.mapLimit(areaList, 1, async area => {
            await downLoadAllArea(area.areaId)
        })
    } else {
        count++;
        console.log(areaList[0].name + `(第${count}个)` + '下载完毕！');
    }
}


async function downLoadAndParse(areaId) {
    await downLoadFile(areaId)
    let areaList = await parseFile(areaId)
    return areaList
}


(async () => {
    targetAreaId = getCliAreaId();
    if (targetAreaId) {
        await downLoadAllArea(targetAreaId)
    }
})()

module.exports = {
    downLoadAndParse
}