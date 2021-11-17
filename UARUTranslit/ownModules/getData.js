const translit = require('cyrillic-to-translit-js')
const mainFunc = require('./getInfo')
const sleeper = require('./sleepTimer')
async function makeData(arrOfEachProd, language) {
    try {
        let atr = []
        let imgs = []
        let arrObjs = []
        let arrKeyVal = []
        await Promise.all(
            arrOfEachProd.map((prod, iter) =>
                new Promise(async (resolve, rej) => {
                    await sleeper.wait(Math.random() * (4000 - 500) + 500)
                    let exObj = {}
                    let keyObj = {}
                    let imgObj = {}
                    let keys = Object.keys(prod['breadcrumbs'])
                    // let key = keys.at(-1)
                    exObj.iter = iter
                    exObj.url = prod['breadcrumbs'][keys.length - 1]
                    exObj.name = prod['product']['name']
                    exObj.price = prod['product']['prices']['price']
                    if (prod['product']['sku'])
                        exObj.sku = prod['product']['sku']
                    imgObj.name = prod['product']['name']
                    imgObj.imgs = []
                    for (let each in prod['product']['attributes']) {
                        if (language) {
                            exObj[translit({ preset: "uk" }).transform(each, "_")] = {}
                            if (!atr.includes(each)) {
                                atr.push(each)
                                keyObj[translit({ preset: "uk" }).transform(each, "_")] = each
                            }
                        }
                        else {
                            exObj[translit().transform(each, "_")] = {}
                            if (!atr.includes(each)) {
                                atr.push(each)
                                keyObj[translit().transform(each, "_")] = each
                            }
                        }
                        for (let elem in prod['product']['attributes'][each]) {
                            if (language) {
                                if (!atr.includes(elem)) {
                                    atr.push(elem)
                                    keyObj[translit({ preset: "uk" }).transform(elem, "_")] = elem
                                }
                                exObj[translit({ preset: "uk" }).transform(each, "_")][translit({ preset: "uk" }).transform(elem, "_")] = prod['product']['attributes'][each][elem]
                            } else {
                                if (!atr.includes(elem)) {
                                    atr.push(elem)
                                    keyObj[translit().transform(elem, "_")] = elem
                                }
                                exObj[translit().transform(each, "_")][translit().transform(elem, "_")] = prod['product']['attributes'][each][elem]
                            }
                        }
                    }
                    for (let img in prod['product']['images']) {
                        imgObj.imgs.push("https://cdn0.it4profit.com/" + prod['product']['images'][img])
                    }
                    imgObj.mainImg = "https://cdn0.it4profit.com/" + prod['product']['image']
                    arrObjs.push(exObj)
                    if (Object.keys(keyObj).length !== 0)
                        arrKeyVal.push(keyObj)
                    imgs.push(imgObj)
                    resolve()
                }
                )
            ))
        return Promise.resolve([arrObjs, arrKeyVal, imgs])
    } catch (e) { console.log(e) }
}

exports.getData = async function ab() {
    try {
        let mass = await mainFunc.getLinksOfEachProd()
        let ruData = await makeData(mass[0], false)
        let uaData = await makeData(mass[1], true)
        return Promise.resolve([ruData, uaData])
    } catch (e) {
        console.log(e)
    }
}