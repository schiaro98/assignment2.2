function getStationInfo(req, res){
    const axios = require('axios').default;

    function getAxiosSolutions(){
        const url = "http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/partenze"
        const station = "/" + req.query.stationID
        const date = "/" + req.query.date
        const urlComponed = url + station + date

        return axios.get(urlComponed).
        then(response => {
            let solToDisplay = [];

            response.data.forEach(element => {
                solToDisplay.push({
                    trainNumber :element.numeroTreno,
                    arrival: element.destinazione,
                    departureTime :element.orarioPartenza,
                    retard: element.ritardo,
                });
            })

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
    getStationInfo
}