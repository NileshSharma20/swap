const axios = require("axios")

var symbol = [];
var logoURI = [];

const getTokens = async() => {
const tokens = []
await axios.get(`https://api.1inch.io/v4.0/56/tokens`)
    .then(function (response) {
        var data = response.data;
        var i = 0;
        var j = 0;
        Object.keys(data.tokens).forEach(function (key) {
            symbol[i++] = data.tokens[key].symbol;
            logoURI[j++] = data.tokens[key].logoURI;
        })
        for (let i = 0; i < symbol.length; i++) {
            tokens.push({symbol:symbol[i],logoURI: logoURI[i]});
        }
        console.log(tokens)
        return tokens
    })
    .catch(function (error){
        console.log(error)
    })
}

export default getTokens