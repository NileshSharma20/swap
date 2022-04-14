import axios from "axios";

const protocolApi = 'https://api.1inch.io/v4.0/56/liquidity-sources';
const protocols = []

const getProtocols = async() => {
     await axios.get(protocolApi)
        .then(function (response) {
            const data = response.data;
            Object.keys(data.protocols).forEach(function (key) {
                protocols.push({
                    id: data.protocols[key].id,
                    title: data.protocols[key].title,
                    isChecked: true});
            })
            
        })
        .catch(function (error){
            console.log(error)
        })
        return protocols
}

const protocolService = {
    getProtocols,
}

export default protocolService