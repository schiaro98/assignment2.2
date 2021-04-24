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
        }).then(response=>
         // console.log(response);
         response.data)
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

function getPostError(req, res){
    res.send('Post not available')
}

module.exports = {
    getIndex,
    getTrainSolutions,
    getPostError
}