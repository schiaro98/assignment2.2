module.exports = function (app){
    const trainController = require('../controllers/trainController')
    app.route('/').get(trainController.getIndex) //.post(trainController.getPostError)
    app.route('/form')//.get(trainController.getTrainSolutions).post(trainController.getPostError)
}