function getIndex(req, res){
    res.sendFile(__dirname + '/index.html')
}

function getTrainSolutions(req, res){
    const axios = require('axios').default;

    function getStationId(){
        return axios.get("http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/cercaStazione/"+req.query.departure)
            .then(response=>{
                return response.data[0].id;
        }).catch(function (error){
                console.log(error);
            })
    }

    function getSolutions(){
        return axios.get("https://www.lefrecce.it/msite/api/solutions",{
            params:{
                origin:req.query.departure,
                destination:req.query.arrival,
                arflag:"A",
                adate:req.query.date,
                atime:req.query.time,
                adultno:1,
                childno:0,
                direction:"A",
                frecce:false,
                onlyRegional:false
            }
        }).then(response=>{
            let solToDisplay = [];
            response.data.forEach(element => {
                solToDisplay.push({
                    idsolution: element.idsolution,
                    departuretime: element.departuretime,
                    arrivaltime: element.arrivaltime,
                    duration:element.duration,
                    trainidentifier: element.trainlist[0].trainidentifier //potrei iterare tutta la lista ma sembra essercene sempre e solo una
                })});
            return solToDisplay;
            })
            .catch(function (error){
                console.log(error);
            })
    }

    Promise.all([getStationId(), getSolutions()])
        .then((data)=>{
            res.json({departureStationId: data[0], solutions: data[1]})
        })
}

module.exports = {
    getIndex,
    getTrainSolutions
}