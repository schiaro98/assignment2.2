function getRealTimeInfo(req, res){
    const axios = require('axios').default;

    function getRealTimeTrainInfo(){
        const url = "http://www.viaggiatreno.it/viaggiatrenomobile/resteasy/viaggiatreno/andamentoTreno"
        const station = "/" + req.query.stationID
        const trainNumber = "/" + req.query.trainID
        const date = "/" + req.query.date
        const urlComponed = url + station + trainNumber + date
        if(station === "/" || trainNumber === "/" || date === "/"){
            return {
                error: "Station, trainNumber or date not given"
            }
        } else {
            return axios.get(urlComponed).
            then(response=>{
                let stopStations = [];
                response.data.fermate.forEach(f => stopStations.push({
                    "Name" : f.stazione,
                    "stopDeparture" : f.partenza_teorica,
                    "stopArrival" : f.arrivo_teorico,
                    "stopDepartureReal" : f.partenzaReale,
                    "stopArrivalReal" : f.arrivoReale,
                    "stopDelay": f.ritardo,
                    "stopStationID": f.id
                }))
                return {
                    lastRelevation: response.data.oraUltimoRilevamento,
                    lastStation: response.data.stazioneUltimoRilevamento,
                    departure: response.data.origine,
                    arrival: response.data.destinazione,
                    departureTime: response.data.orarioPartenzaZero,
                    arrivalTime: response.data.orarioArrivoZero,
                    trainNumber: response.data.compNumeroTreno,
                    trainDelay: response.data.ritardo,
                    stops: stopStations
                }
            }).catch(function (error){
                console.log(error);
            })
        }
    }

    getRealTimeTrainInfo()
        .then( (data)=>{
            res.json(data)
        })
}

function getTrainDepartureStation(req, res){
    const axios = require('axios').default;

    function getStationCode(){
        const url = "http://www.viaggiatreno.it/viaggiatrenomobile/resteasy/viaggiatreno/cercaNumeroTreno/"
        const trainID = "/" + req.query.trainID
        const urlComponed = url + trainID
        if(trainID === "/" ){
            return {
                error: "Train number not given"
            }
        } else {
            return axios.get(urlComponed).then(response=>{
                return {
                    stationId : response.data.codLocOrig
                }
            }).catch(function (error){
                console.log(error);
            })
        }
    }

    getStationCode()
        .then( (data)=>{
            res.json(data)
        })
}

module.exports = {
    getRealTimeInfo,
    getTrainDepartureStation
}