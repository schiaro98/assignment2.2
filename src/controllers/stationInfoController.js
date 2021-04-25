function getStationInfo(req, res){
    const axios = require('axios').default;
    const url = "http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/"
    const station = "/" + req.query.stationID
    const date = "/" + req.query.date

    function getDepartureSolutions(){
        const urlComponed = url + "partenze" + station + date
        return axios.get(urlComponed).
        then(response => {
            let solToDisplay = [];
            response.data.forEach(element => {
                solToDisplay.push({
                    desc: "Treno in partenza",
                    trainNumber : element.numeroTreno,
                    arrival: element.destinazione,
                    departureTime :element.orarioPartenza,
                    retard: element.ritardo,
                });
            })

            return solToDisplay;
        }).catch(function (error){
                console.log(error);
        })
    }

    function getArrivalSolution(){
        const urlComponed = url + "arrivi" + station + date
        return axios.get(urlComponed).
        then(response => {
            let solToDisplay = [];
            response.data.forEach(element => {
                solToDisplay.push({
                    desc: "Treno in arrivo",
                    trainNumber : element.numeroTreno,
                    origin: element.origine,
                    arrivalTime :element.orarioArrivo,
                    retard: element.ritardo,
                });
            })

            return solToDisplay;
        }).catch(function (error){
            console.log(error);
        })
    }

    axios.all([getDepartureSolutions(), getArrivalSolution()])
        .then(axios.spread((departure, arrival) => {
            res.json(departure.concat(arrival))
        }));
}

module.exports = {
    getStationInfo
}