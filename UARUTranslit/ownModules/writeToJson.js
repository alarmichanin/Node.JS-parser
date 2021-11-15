const fs = require('fs')
const mainFunc = require("./getData")

exports.writeInfo = async function writeInfo() {
    let data = await mainFunc.getData()

    let strUA = JSON.stringify(data[1][0], null, '\t')
    fs.writeFileSync('./UARUTranslit/ownModules/UA/UAdata.json', strUA)

    let strAttributesUA = JSON.stringify(data[1][1], null, '\t')
    fs.writeFileSync('./UARUTranslit/ownModules/UA/attributesUA.json', strAttributesUA)

    let imgsUA = JSON.stringify(data[1][2], null, '\t')
    fs.writeFileSync('./UARUTranslit/ownModules/UA/imgsUA.json', imgsUA)

    let strRU = JSON.stringify(data[0][0], null, '\t')
    fs.writeFileSync('./UARUTranslit/ownModules/RU/RUdata.json', strRU)

    let strAttributesRU = JSON.stringify(data[0][1], null, '\t')
    fs.writeFileSync('./UARUTranslit/ownModules/RU/attributesRU.json', strAttributesRU)

    let imgsRU = JSON.stringify(data[0][2], null, '\t')
    fs.writeFileSync('./UARUTranslit/ownModules/RU/imgsRU.json', imgsRU)

    return Promise.resolve(console.log("DONE!"))

}