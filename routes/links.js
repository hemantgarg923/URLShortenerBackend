const express = require('express');
const router = express.Router();
const Links = require('../models/Links');
const fetchuser = require('../middleware/fetchuser');

var counter = 56800235584;
router.post('/createshortlink', async (req, res) => {

    try {
        let { longLink } = req.body;
        let shortLink = toBase62(counter);
        let hitCount = 1;
        counter++;
        
        let link = new Links({
            shortLink, longLink, hitCount
        });
        let savedLink = await link.save();
        let domain = "http://localhost:3000/api/links/";
        response = domain + shortLink;
        res.json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("internal server error");
    }
})

router.get('/:shortLink', async (req, res) => {
    try {

        const link = await Links.findOne({ shortLink: req.params.shortLink });
        if (!link) {
            return res.status(404).json("link not found");
        }

        let currTime = Date.now();
        if (link.date.getTime() + 172800000 <= currTime) {
            res.json("link expired");
        }

        let hitCount = link.hitCount;
        console.log(hitCount);
        Links.findOneAndUpdate({ shortLink: req.params.shortLink }, {hitCount: hitCount+1}, {new: true, upsert: true});
        res.redirect(link.longLink);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("internal server error");
    }
})

function toBase62(n) {
    if (n === 0) {
        return '0';
    }
    let digits = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    while (n > 0) {
        result = digits[n % digits.length] + result;
        n = parseInt(n / digits.length, 10);
    }

    return result;
}

module.exports = router;