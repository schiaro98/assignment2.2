function getIndex(req, res){
    res.sendFile(__dirname + '/index.html')
}

function getTrainSolutions(req, res){
    const axios = require('axios').default;
    function getAxiosSolutions(){
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
    getAxiosSolutions()
        .then((data)=>{
            res.json(data)
        })
}

module.exports = {
    getIndex,
    getTrainSolutions
}