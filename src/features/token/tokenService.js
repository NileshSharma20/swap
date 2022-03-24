import axios from "axios";

const tokens = []

const getTokens = async() => {
     await axios.get(`https://api.1inch.io/v4.0/56/tokens`)
        .then(function (response) {
            const data = response.data;
            Object.keys(data.tokens).forEach(function (key) {
                tokens.push({symbol:data.tokens[key].symbol,
                    name:data.tokens[key].name,
                    decimals: data.tokens[key].decimals,
                    address: data.tokens[key].address,
                    logoURI:data.tokens[key].logoURI});
            })
            
        })
        .catch(function (error){
            console.log(error)
        })
        return tokens
}

const tokenService = {
    getTokens,
}

export default tokenService