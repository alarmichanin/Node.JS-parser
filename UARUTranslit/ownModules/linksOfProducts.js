const mainFunc = require('../uaru')
async function getMainLinks() {
    let ruVar = await mainFunc.getLinksOfProducts('https://ion.ua/api/catalog/categories')
    let uaVar = await mainFunc.getLinksOfProducts('https://ion.ua/ua/api/catalog/categories')
    return Promise.resolve([ruVar, uaVar])
}
function makeMassWithProducts(sin) {
    let arrayOfProducts = []

    let lengthOfCategories = Object.keys(sin).length
    for (let i = 0; i < lengthOfCategories; i++) {
        if (sin[i]["children"]) {
            let lengthOfSubcategories = Object.keys(sin[i]["children"]).length
            for (let j = 0; j < lengthOfSubcategories; j++) {
                arrayOfProducts.push(sin[i]["children"][j]["url"])
                if (i == 6) {
                    let lengthOfSubcategoriesOfAccessories = Object.keys(sin[i]["children"][j]["children"]).length
                    for (let k = 0; k < lengthOfSubcategoriesOfAccessories; k++) {
                        arrayOfProducts.push(sin[i]["children"][j]["children"][k]['url'])
                    }
                }
            }
        }

    }
    return Promise.resolve(arrayOfProducts)
}


exports.ab = async function ab() {
    let mass = await getMainLinks()
    let jsonObjRU = await makeMassWithProducts(mass[0])
    let jsonObjUA = await makeMassWithProducts(mass[1])
    return Promise.resolve([jsonObjRU, jsonObjUA])
}