module.exports = (app) => {
    var index = require('../controller/index');
    var url = require('../controller/url');

    // Home page
    app.get('/', index.index);

    // Create
    app.post('/generate', url.generate)
    
    // Redirect
    app.get('/:shortcode', url.shortUrl)

    // Get Stats
    app.get('/:shortcode/stats',url.stats)

}