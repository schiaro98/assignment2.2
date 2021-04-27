module.exports = function (app){
    const trainController = require('../controllers/trainController')
    const realTimeInfoController = require('../controllers/realTimeInfoController')
    const stationInfoController = require('../controllers/stationInfoController')

    app.route('/').get(trainController.getIndex)
    app.route('/monitor').get(trainController.getMonitor) //.post(trainController.getPostError)
    app.route('/realtimeInfo').get(realTimeInfoController.getRealTimeInfo)
    app.route('/solutions').get(trainController.getTrainSolutions)
    app.route('/trainStation').get(realTimeInfoController.getTrainDepartureStation)
    app.route('/stationInfo').get(stationInfoController.getStationInfo)
}