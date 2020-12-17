

// We collect routes and one
module.exports = (app) => {
    var url = require('./routers/url')(app);

    // Routes
    app.route('/',url);

}