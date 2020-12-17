

module.exports = {
    index: (req, res, next) => {
        try {
            res.render('index', { title: 'Shortster - For MovingWorlds' });
        } catch(err) {
            next(err);
        }
    },

}