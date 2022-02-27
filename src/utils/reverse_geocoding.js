const axios = require("axios")

const dotenv = require("dotenv")

dotenv.config()

const { POSITIONSTACK_APIKEY } = process.env

if (!POSITIONSTACK_APIKEY) {
    console.error("ENV POSITIONSTACK_APIKEY required");
}


const client = axios.create({
    baseURL: "http://api.positionstack.com",
});

const getAddress = ({ lat, lon }) => new Promise((resolve) => {
    console.log(`Ejecutando consulta lat ${lat} lon ${lon}`);
    const params = {
        access_key: POSITIONSTACK_APIKEY,
        query: `${lat}, ${lon}`,
    };
    console.table(params);
    client.get(`/v1/reverse?access_key=${POSITIONSTACK_APIKEY}&query=${lat},${lon}`)
        .then(({ data }) => {
            return resolve({ data: data.data });
        })
        .catch((err) => {
            console.log(err);
        });
})

module.exports = {
    getAddress
}