**UPD:** ~~appGen.js~~ and ~~logicGen.js~~ from previous versions become deprecated.
# Node.JS parser
 This parser was developed for only one site, in order to get information about the products on the page using only requests to the server. 
 
 There are 2 versions of the site (Ukrainian and Russian). 
 In the original, the code contained an implementation through Russian names, which is not good. 
 It was decided to rewrite words with transliteration through the module (`cyrillic-to-translit-js`). 
## appForTranslit.js
 It's a file that consist of 2 main ideas (to get translit of attributes for future using in DB and to get json file with information about products)
>UARUTranslit
### uaru.js
 Here we get general links which we will use in the future files. 
 For this, we go through the entire site (we get a list of categories, then, for each category, and then for each product in the category) 
>ownModules
### linkOfProducts.js
 Here we use two main links (for Ukrainian and Russian version of site), to get info about Products' links
 Return it like an array with two arrays (ru/ua)
### getLinksOfEachProducts.js
 In this file we use `linkOfProducts.js`, get array with links and process it. 
 After all operations we get new massive (ru/ua), which consist of links to each product.
### getInfo.js
 It use `getLinksOfEachProducts.js` for getting array with two type of links. 
 After that, we can use function makeStartTranslit to get object with information that we need for our translit task.
 Also, we export `getLinksOfEachProd` fucntion to use in the other file.
### getDate.js
 Here we use `getLinksOfEachProd` from `getInfo.js` that we have opportunity to make objects for writing to the json files (like general information, attributes, images).
 Return - array (ru/ua), which consists of array with data about images, attributes and global information about product.
### writeToJson.js
 This file make writes to the files with information that we get from `getDate.js`.
## Small modules
- randomInt.js  (to get random integer from diapason)
- sleepTimer.js (use it for making a stop point in for loop)
