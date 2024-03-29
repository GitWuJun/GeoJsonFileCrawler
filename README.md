### 说明
该项目是一个用于下载[阿里DataV.GeoAtlas](http://datav.aliyun.com/tools/atlas)地图GeoJson文件的node程序

### 使用
1. 安装相关modules:`npm install`
2. 执行命令:`npm run server 「区域id」`(暂不支持全国id 100000)

    如`npm run server 430000`(下载湖南下辖所有市、区、县的地图文件) `npm run server 430100`(下载长沙下辖所有区县的地图文件)
4. 最后会将文件下载到`map`文件夹下(以省id作为文件夹)
5. 根据区域id获取该地区下直属子区域的名称和areaId:`npm run area 「区域id」`(会在控制台直接打印出),例如`npm run server 430000`(获取湖南省直属子区域信息)
![20210312094556.png](https://wujun-pic-bed.oss-cn-chengdu.aliyuncs.com/img/20230128160927.png)


### 中国所有省/直辖市/特别行政区的名称与areaId

| 名称  | areaId|
|  ----  | ----  |
|  北京市 | 110000 |
| 天津市  | 120000 |
| 河北省  | 130000 |
| 山西省  | 140000 |
| 内蒙古自治区  | 150000 |
| 辽宁省  | 210000 |
| 吉林省  | 220000 |
| 黑龙江省  | 230000 |
| 上海市  | 310000 |
| 江苏省  | 320000 |
| 浙江省  | 330000 |
| 安徽省  | 340000 |
| 福建省  | 350000 |
| 江西省  | 360000 |
| 山东省  | 370000 |
| 河南省  | 410000 |
|  湖北省 | 420000 |
| 湖南省  | 430000 |
| 广东省  | 440000 |
| 广西壮族自治区  | 450000 |
| 海南省  | 460000 |
|  重庆市 | 500000 |
| 四川省  | 510000 |
|  贵州省 | 520000 |
| 云南省  | 530000 |
|  西藏自治区 | 540000 |
|  陕西省 | 610000 |
|  甘肃省 | 620000 |
|  青海省 | 630000 |
| 宁夏回族自治区  | 640000 |
| 新疆维吾尔自治区  | 650000 |
|  台湾省 | 710000 |
| 香港特别行政区  | 810000 |
| 澳门特别行政区  | 820000 |
