const { getEnumKey, AreaGrade } = require('./enumApi')


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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    isProvinceId,
    isCountryId,
    getAreaGrade,
    getProvinceId,
    sleep
}
