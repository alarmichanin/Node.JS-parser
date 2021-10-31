const request = require('request')
const sleeper = require('./ownModules/sleepTimer')
const { randomInteger } = require('./ownModules/randomInt')
const { HttpsProxyAgent } = require("hpagent");
const got = require("got");

exports.getLinksOfProducts = function getLinksOfProducts(categoriesLink) {
    return new Promise((resolve) => {
        request({ url: categoriesLink, json: true }, function (err, res, json) {
            resolve(json)
        })
    })
}

exports.getLinksOfEachProducts = async function getLinksOfEachProducts(startOfLink, arrOfCatLinks) {
    let arrOfEachProduct = []
    await Promise.all(
        arrOfCatLinks.map(link =>
            new Promise(async (resolve) => {
                await sleeper.wait(Math.random() * (4000 - 500) + 500)
                if (link) {
                    request({ url: startOfLink + 'category/' + link, json: true }, async function (err, res, json) {
                        if (err)
                            throw err
                        arrOfEachProduct.push(json)
                        resolve()
                    })
                }
            })
        )
    )
    return Promise.resolve(arrOfEachProduct)
}


exports.getInfo = async function getInfo(startOfLink, arrOfEachProdLinks) {
    let infoOfEachProduct = []
    const proxies = ['http://109.200.159.28:8080/', 'http://185.142.67.23:8080/', 'http://188.133.158.51:1256/', 'http://5.183.71.145:39305/', 'http://62.182.66.88:9090/', 'http://194.44.15.222:8081/', 'http://195.138.90.226:3128/']
    let i = 0
    await Promise.all(
        arrOfEachProdLinks.map(link =>
            new Promise(async (resolve) => {
                let agent = {
                    https: new HttpsProxyAgent({
                        keepAlive: true,
                        keepAliveMsecs: 1000,
                        maxSockets: 256,
                        maxFreeSockets: 256,
                        scheduling: 'lifo',
                        proxy: proxies[i],
                        retry: { limit: 5 },
                    })
                }
                await sleeper.wait(Math.random() * (4000 - 500) + 500)
                if (link) {
                    try {
                        const res = await got(startOfLink + link, {
                            timeout: 150000,
                            agent,
                        })
                        if (res.statusCode !== 200)
                            throw err
                        else {
                            infoOfEachProduct.push(JSON.parse(res.body))
                        }
                    } catch (e) {
                        i = randomInteger(0, 6)
                        agent.https.proxy = proxies[i]
                    }
                }
                resolve()
            }
            )
        ))
    return Promise.resolve(infoOfEachProduct)
}