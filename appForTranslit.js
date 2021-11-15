const fs = require('fs')
const getInfo = require('./UARUTranslit/ownModules/getInfo')
const writeData = require('./UARUTranslit/ownModules/writeToJson')
async function start() {
    // let data = await getInfo.getTranslit()
    // let str = JSON.stringify(data, null, '\t')
    // fs.appendFileSync('./UARUTranslit/translit.json', str, (err) => {
    //     if (err)
    //         return console.log(err)
    // })
    let done = await writeData.writeInfo()
}

start()

// translitF.ab().then(console.log)



// const logic = require('./logic.js')
// const fs = require('fs')


// const urlUA = 'https://ion.ua/ua/'
// const categoriesUA = 'https://ion.ua/ua/api/catalog/categories'
// const generalLinkUA = 'https://ion.ua/ua/api/apr/catalog/products/'

// const generalLinkRU = 'https://ion.ua/api/apr/catalog/products/'
// const categoriesRU = 'https://ion.ua/api/catalog/categories'
// const urlRU = 'https://ion.ua'

// async function startParse() {
//     let arrObjsUA = []
//     let keyValUA = []
//     let arrOfAtrUA = []
//     let arrOfImgUA = []
// let arrOfCategoryLinksUA = await logic.getLinksOfProducts(categoriesUA)


//     let arrOfEachProductLinksUA = await logic.getLinksOfEachProducts(generalLinkUA, arrOfCategoryLinksUA)
//     let arrOfObjsUA = await logic.getInfo(generalLinkUA, arrOfEachProductLinksUA, true, arrObjsUA, keyValUA, arrOfAtrUA, arrOfImgUA)
    // let strUA = JSON.stringify(arrOfObjsUA[0], null, '\t')
    // fs.appendFileSync('./UA/UAdata.json', strUA, (err) => {
    //     if (err)
    //         return console.log(err)
    // })


//     let strAttributesUA = JSON.stringify(arrOfObjsUA[1], null, '\t')
//     fs.appendFileSync('./UA/attributesUA.json', strAttributesUA, (err) => {
//         if (err)
//             return console.log(err)
//     })

//     let imgsUA = JSON.stringify(arrOfObjsUA[2], null, '\t')
//     fs.appendFileSync('./UA/imgsUA.json', imgsUA, (err) => {
//         if (err)
//             return console.log(err)
//     })
//     let arrObjsRU = []
//     let keyValRU = []
//     let arrOfAtrRU = []
//     let arrOfImgRU = []
//     let arrOfCategoryLinksRU = await logic.getLinksOfProducts(categoriesRU)
//     let arrOfEachProductLinksRU = await logic.getLinksOfEachProducts(generalLinkRU, arrOfCategoryLinksRU)
//     let arrOfObjsRU = await logic.getInfo(generalLinkRU, arrOfEachProductLinksRU, false, arrObjsRU, keyValRU, arrOfAtrRU, arrOfImgRU)
//     let strRU = JSON.stringify(arrOfObjsRU[0], null, '\t')
//     fs.appendFileSync('./RU/RUdata.json', strRU, (err) => {
//         if (err)
//             return console.log(err)
//     })

//     let strAttributesRU = JSON.stringify(arrOfObjsRU[1], null, '\t')
//     fs.appendFileSync('./RU/attributesRU.json', strAttributesRU, (err) => {
//         if (err)
//             return console.log(err)
//     })

//     let imgsRU = JSON.stringify(arrOfObjsRU[2], null, '\t')
//     fs.appendFileSync('./RU/imgsRU.json', imgsRU, (err) => {
//         if (err)
//             return console.log(err)
//     })

//     return console.log("DONE!!!")
// }
// startParse()