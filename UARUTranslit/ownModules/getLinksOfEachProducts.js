const mainFunc = require('../uaru')
const linksOfProducts = require('./linksOfProducts')
const generalLinkUA = 'https://ion.ua/ua/api/apr/catalog/products/'
const generalLinkRU = 'https://ion.ua/api/apr/catalog/products/'



async function getLinksOfEachType() {
    let data = await linksOfProducts.ab()
    let ruVar = await mainFunc.getLinksOfEachProducts(generalLinkRU, data[0])
    let uaVar = await mainFunc.getLinksOfEachProducts(generalLinkUA, data[1])
    return Promise.resolve([ruVar, uaVar])
}


function makeMassWithProductsEachType(sin) {
    let arrOfEachProduct = []
    for (let i = 0; i < sin.length; i++) {
        let sizeOfProducts = Object.keys(sin[i]['products']['data']).length
        for (let j = 0; j < sizeOfProducts; j++) {
            arrOfEachProduct.push(sin[i]['products']['data'][j]['url'])
        }
    }
    return Promise.resolve(arrOfEachProduct)
}


exports.finalEach = async function ab() {
    let mass = await getLinksOfEachType()
    let jsonObjRU = await makeMassWithProductsEachType(mass[0])
    let jsonObjUA = await makeMassWithProductsEachType(mass[1])
    return Promise.resolve([jsonObjRU, jsonObjUA])
}