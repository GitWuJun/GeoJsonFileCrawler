
/**
 *  返回枚举值
 *  eg: getEnumKey(PhysicalCondition, 1)--- NORMAL
 *  eg: getEnumKey(PhysicalCondition, 1, true)--- '正常'
 *  params
 * nameCodeEnum 枚举名
 * valueEnum 需要查找的枚举值
 * */
 function getEnumKey(nameCodeEnum, valueEnum, getName) {
    if (nameCodeEnum && valueEnum !== undefined) {
        if (typeof valueEnum === 'object') {
            valueEnum = valueEnum.value;
        }
        let enumKey = null;
        for (let key in nameCodeEnum) {
            if (!getName) {
                for (let k in nameCodeEnum[key]) {
                    if (nameCodeEnum[key][k] === valueEnum) {
                        enumKey = key;
                        return enumKey;
                    }
                }
            } else {
                if (nameCodeEnum[key].value === valueEnum) {
                    return nameCodeEnum[key].name;
                }
            }
        }
    }
}

 const AreaGrade = {
    COUNTRY: {name: '国家', value: 0},
    PROVINCE: {name: '省级', value: 1},
    CITY: {name: '市级', value: 2},
    COUNTY: {name: '县级', value: 3},
    STREET: {name: '乡级', value: 4},
    VILLAGE: {name: '社村', value: 5}
};

module.exports = {
    getEnumKey,
    AreaGrade
}