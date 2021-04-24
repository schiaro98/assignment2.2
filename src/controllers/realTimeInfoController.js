function getRealTimeInfo(req, res){
    const axios = require('axios').default;
    function getAxiosSolutions(){
        const url = "http://www.viaggiatreno.it/viaggiatrenomobile/resteasy/viaggiatreno/andamentoTreno/"
        const station = "/" + req.query.stationID
        const trainNumber = "/" + req.query.trainID
        const date = "/" + req.query.date
        const urlComponed = url + station + trainNumber + date

        return axios.get(urlComponed).
        then(response=>{
            let solToDisplay = [];
            let stopStations = [];
            response.data.fermate.forEach(f => stopStations.push(f.stazione))
            solToDisplay.push({
                lastRelevation:response.data.oraUltimoRilevamento,
                lastStation:response.data.stazioneUltimoRilevamento,
                departure:response.data.origine,
                arrival:response.data.destinazione,
                departureTime: response.data.orarioPartenzaZero,
                arrivalTime: response.data.orarioArrivoZero,
                trainNumber: response.data.compNumeroTreno,
                stops: stopStations
            });
            return solToDisplay;
        })
            .catch(function (error){
                console.log(error);
            })
            .catch(function (error){
                console.log(error);
            })
    }

    getAxiosSolutions()
        .then( (data)=>{
            res.json(data)
        })
}

module.exports = {
    getRealTimeInfo
}