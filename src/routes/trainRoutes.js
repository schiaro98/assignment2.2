module.exports = function (app){
    const trainController = require('../controllers/trainController')
    const realTimeInfo = require('../controllers/realTimeInfoController')

    app.route('/').get(trainController.getIndex) //.post(trainController.getPostError)
    app.route('/solutions').get(trainController.getTrainSolutions)
    app.route('/form')//.get(trainController.getTrainSolutions).post(trainController.getPostError)
}