### 说明
该项目是一个用于下载[阿里DataV.GeoAtlas](http://datav.aliyun.com/tools/atlas)地图GeoJson文件的node程序

### 使用
执行命令:`npm run server 「区域id」`(暂不支持全国id 100000)

如`npm run server 430000`(下载湖南下辖所有市、区、县的地图文件) `npm run server 430100`(下载长沙下辖所有区县的地图文件)

最后会将文件下载到项目根目录(以省id作为文件夹)