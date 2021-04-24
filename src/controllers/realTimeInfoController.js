function getRealTimeInfo(req, res){
    const axios = require('axios').default;
    function getAxiosSolutions(){
        const url = "http://www.viaggiatreno.it/viaggiatrenomobile/resteasy/viaggiatreno/andamentoTreno/"
        const station = ""
        const trainNumber = ""
        const date = ""
        const urlComponed = url + station + trainNumber + date
        return axios.get(urlComponed)
            .then(response => response.data)
            .catch(function (error){
                console.log(error);
            })
    }

    getAxiosSolutions()
        .then( (data)=>{
            console.log(data)
            res.status(200).send('ok')
        })
}

module.exports = {
    getRealTimeInfo
}