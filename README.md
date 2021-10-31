# Node.JS parser
 This parser was developed for only one site, in order to get information about the products on the page using only requests to the server. 
 
 There are 2 versions of the site (Ukrainian and Russian). 
 In the original, the code contained an implementation through Russian names, which is not good. 
 It was decided to rewrite words with transliteration through the module (`cyrillic-to-translit-js`). 
 
### appGen.js
 Writing to files is implemented here. 
 It is based on the data returned by the functions described in the file logicGen.js
 
### logicGen.js
 The functionality of the entire parser is described here. 
 1) First, we collect all links with product categories. 
 2) We go through each category and collect the types of products in the category. 
 3) We send a request for each type and find all goods of a certain type. 
 4) After all, you can send a request for a specific product and find out information about it.
