const { AreaGrade } = require('../libs/enumApi')
const { getAreaGrade } = require('../libs/util')

module.exports = function (data) {
    if (data && data.features) {
        let features = data.features;
        let areaList = features.map(item => {
            let properties = item.properties
            return {
                name: properties.name,
                areaId: properties.adcode,
                areaGrade: AreaGrade[getAreaGrade(properties.adcode)]
            }
        })
        return areaList;
    } else {
        return [];
    }
}