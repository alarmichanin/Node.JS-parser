const translit = require('cyrillic-to-translit-js')
const translate = require('@vitalets/google-translate-api');
const mainFunc = require('../uaru')
const eachProd = require('./getLinksOfEachProducts')
const generalLinkUA = 'https://ion.ua/ua/api/apr/catalog/products/'
const generalLinkRU = 'https://ion.ua/api/apr/catalog/products/'

async function getLinksOfEachProd() {
    try {
        let data = await eachProd.finalEach()
        let ruVar = await mainFunc.getInfo(generalLinkRU, data[0])
        let uaVar = await mainFunc.getInfo(generalLinkUA, data[1])
        return Promise.resolve([ruVar, uaVar])
    } catch (e) {
    }
}

async function makeStartTranslit(sin) {
    // sin - mass[ru,ua]
    let obj = {}
    let objForInsert = {}
    let massObj = []
    for (let each in sin[0]) {
        for (let every in sin[0][each]["product"]['attributes']) {
            const res = await translate(every, { from: 'ru', to: 'uk' })
            objForInsert[translit().transform(every, "_")] = translit({ preset: "uk" }).transform(res.text, "_")
        }
        obj.url = sin[0][each]["cross"]["ua"]
        obj.content = objForInsert
        massObj.push(obj)
    }
    return Promise.resolve(massObj)
}


module.exports = {
    getLinksOfEachProd
}
module.exports.getTranslit = async function ab() {
    try {
        let mass = await getLinksOfEachProd()
        let jsonObjRUUA = await makeStartTranslit(mass)
        return Promise.resolve(jsonObjRUUA)
    } catch (e) {
        console.log(e)
    }
}