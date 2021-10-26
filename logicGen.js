const translit = require('cyrillic-to-translit-js')
const request = require('request')

exports.getLinksOfProducts = async function getLinksOfProducts(categoriesLink) {
    return new Promise((resolve) => {
        let arrayOfProducts = []
        request({ url: categoriesLink, json: true }, (err, res, json) => {
            if (err)
                throw err
            let lengthOfCategories = Object.keys(json).length
            for (let i = 0; i < lengthOfCategories; i++) {
                if (json[i]["children"]) {
                    let lengthOfSubcategories = Object.keys(json[i]["children"]).length
                    for (let j = 0; j < lengthOfSubcategories; j++) {
                        arrayOfProducts.push(json[i]["children"][j]["url"])
                        if (i == 6) {
                            let lengthOfSubcategoriesOfAccessories = Object.keys(json[i]["children"][j]["children"]).length
                            for (let k = 0; k < lengthOfSubcategoriesOfAccessories; k++) {
                                arrayOfProducts.push(json[i]["children"][j]["children"][k]['url'])
                            }
                        }
                    }
                }
            }
            console.log("DONE GET LINKS!")
            resolve(arrayOfProducts)
        })
    })
}

exports.getLinksOfEachProducts = async function getLinksOfEachProducts(startOfLink, arrOfCatLinks) {
    let arrOfEachProduct = []
    await Promise.all(
        arrOfCatLinks.map(link =>
            new Promise(async (resolve) => {
                await sleep(Math.random() * (4000 - 500) + 500)
                if (link) {
                    request({ url: startOfLink + 'category/' + link, json: true }, async function (err, res, json) {
                        if (err)
                            throw err
                        let sizeOfProducts = Object.keys(json['products']['data']).length
                        for (let j = 0; j < sizeOfProducts; j++) {
                            arrOfEachProduct.push(json['products']['data'][j]['url'])
                        }
                        resolve()
                    })
                }
            })
        )
    )
    console.log("DONE GET LINKS!")
    return arrOfEachProduct
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//languageFlag - true for UA/false for RU
exports.getInfo = async function getInfo(startOfLink, arrOfEachProdLinks, languageFlag, arrObjs, arrKeyVal, atr, imgs) {
    let tmpLinks = []

    await Promise.all(
        arrOfEachProdLinks.map(link =>
            new Promise(async (resolve) => {
                await sleep(Math.random() * (3800 - 500) + 500)
                if (link) {
                    request({ url: startOfLink + link, json: true }, async function (err, res, json) {
                        try {
                            if (err) {
                                console.log(link)
                                throw err
                            }
                            if (res['statusCode'] == 200) {
                                var exObj = {}
                                var keyObj = {}
                                var imgObj = {}
                                exObj.name = json['product']['name']
                                exObj.price = json['product']['prices']['price']
                                imgObj.name = json['product']['name']
                                imgObj.imgs = []
                                for (let each in json['product']['attributes']) {
                                    if (languageFlag) {
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
                                    for (let elem in json['product']['attributes'][each]) {
                                        if (languageFlag) {
                                            if (!atr.includes(elem)) {
                                                atr.push(elem)
                                                keyObj[translit({ preset: "uk" }).transform(elem, "_")] = elem
                                            }
                                            exObj[translit({ preset: "uk" }).transform(each, "_")][translit({ preset: "uk" }).transform(elem, "_")] = json['product']['attributes'][each][elem]
                                        } else {
                                            if (!atr.includes(elem)) {
                                                atr.push(elem)
                                                keyObj[translit().transform(elem, "_")] = elem
                                            }
                                            exObj[translit().transform(each, "_")][translit().transform(elem, "_")] = json['product']['attributes'][each][elem]
                                        }
                                    }
                                }
                                for (let img in json['product']['images']) {
                                    imgObj.imgs.push("https://cdn0.it4profit.com/" + json['product']['images'][img])
                                }
                                imgObj.mainImg = "https://cdn0.it4profit.com/" + json['product']['image']
                                arrObjs.push(exObj)
                                if (Object.keys(keyObj).length !== 0)
                                    arrKeyVal.push(keyObj)
                                imgs.push(imgObj)
                            } else {
                                if (!tmpLinks.includes(link))
                                    tmpLinks.push(link)
                            }
                            resolve()
                        } catch (error) {
                            console.log(error)
                        }
                    })
                }
            })
        )
    )
    // console.log(tmpLinks)
    if (tmpLinks.length == 0)
        return [arrObjs, arrKeyVal, imgs]
    else
        return getInfo(startOfLink, tmpLinks, languageFlag, arrObjs, arrKeyVal, atr, imgs)
}

