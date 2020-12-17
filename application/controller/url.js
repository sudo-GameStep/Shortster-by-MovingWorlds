
const mongoose = require('mongoose');
const UrlSchema = mongoose.model('Url');
const validUrl = require('valid-url');
const shortid = require('shortid');

/**
 * This method read records
 *
 * @param req
 * @param res
 */

module.exports = {
    generate: async (req, res) => {
        const { longUrl } = req.body;
        const baseUrl = 'http://localhost:8080';
        let shortcode = req.body.shortcode;

        if (!shortcode) {
            shortcode = shortid.generate().substring(0, 6);
        } else if (shortcode.length < 4) {
            res.render('index', { role: 'danger', url: 'Your shortcodes is less than 4 characters' });
        }

        if (!validUrl.isUri(baseUrl)) {
            res.render('index', { role: 'danger', url: 'Invalid base url' });
        }

        if (validUrl.isUri(longUrl)) {
            try {

                let url = await UrlSchema.findOne({ shortcode });

                if (url) {
                    res.render('index', { role: 'danger', url: 'ShortCode Already in use' });
                } else {
                    const shortUrl = baseUrl + '/' + shortcode;

                    let url = new UrlSchema({
                        shortcode,
                        longUrl,
                        shortUrl,
                        datevisit: new Date(),
                        datecreate: new Date()
                    });

                    await url.save();

                    res.render('index', { role: 'success', url: url.shortUrl });
                }
            } catch (err) {
                console.error(err);
                res.render('index', { role: 'danger', url: 'Server error' });
            }
        } else {
            res.render('index', { role: 'danger', url: 'Invalid long url' });
        }
    },
    shortUrl: async (req, res) => {
        try {
            const url = await UrlSchema.findOne({ shortcode: req.params.shortcode });

            if (url) {
                await url.updateOne({ $inc: { numvisits: 1 }, datevisit: new Date() });
                return res.redirect(url.longUrl);
            } else {
                res.render('index', { role: 'danger', url: 'No url found' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json('Server error');
        }

    },

    stats: async (req, res) => {
        try {
            var result = await UrlSchema.findOne({ shortcode: req.params.shortcode }).lean();
            if (result) {
                res.render('index', { role: 'stats', stats: result });
            } else {
                res.render('index', { role: 'danger', url: 'No url found' });
            }
        } catch (err) {
            console.error(err);
            res.render('index', { role: 'danger', url: 'Server error' });
        }
    },

}
