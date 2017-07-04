const DataLoader = require('./controllers/dataLoader');
const Authentication = require('./controllers/Authentication')

module.exports = function(app){
    app.get('/getCarNames', DataLoader.getCarNames);

    app.post('/getCarData', DataLoader.buildSeries);
    //post muss vermutlich noch ersetzt werden (post benutzt wenn daten in
    //DB kommen, wir wollen Daten aus DB bekommen)
    app.post('/signup', Authentication.signup);
}
