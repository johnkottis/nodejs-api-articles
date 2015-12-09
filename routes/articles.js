/**
 * Title:       articles.js
 * Description: CRUD Functions
 * Version:     0.0.1
 * Author:      John Kottis
 */
var Article = require('../models/article').Article;

/**
 * Returns all articles
 * @param {Object} req is the user request.
 * @return {Object} res is the API response.
 */
exports.index = function(req, res) {
    Article.find({}, function(err, docs) {
        if (!err) {
            res.json(200, {
                articles: docs
            });
        } else {
            res.json(500, {
                message: err
            });
        }
    });
}


/**
 * Returns article details for given id
 * @param {Object} req is the user request.
 * @return {Object} res is the API response.
 */
exports.show = function(req, res) {

    var id = req.params.id;

    Article.findById(id, function(err, doc) {
        if (!err && doc) {
            res.json(200, doc);
        } else if (err) {
            res.json(500, {
                message: "Could not load article." + err
            });
        } else {
            res.json(404, {
                message: "The requested article was not found!"
            });
        }
    });
}


/**
 * Returns all articles details for given channel
 * @param {Object} req is the user request.
 * @return {Object} res is the API response.
 */
exports.showChannel = function(req, res) {

    var channel = req.params.channel;

    Article.find({
        'channel': channel
    }, function(err, doc) {
        console.log(channel);
        if (!err && doc) {
            res.json(200, doc);
        } else if (err) {
            res.json(500, {
                message: "Could not load requested article." + err
            });
        } else {
            res.json(404, {
                message: "The requested article was not found!"
            });
        }
    });
}


/**
 * Returns article details for given status
 * @param {Object} req is the user request.
 * @return {Object} res is the API response.
 */
exports.showStatus = function(req, res) {

    var statuss = req.params.statuss;

    Article.find({
        'statuss': statuss
    }, function(err, doc) {
        console.log(statuss);
        if (!err && doc) {
            res.json(200, doc);
        } else if (err) {
            res.json(500, {
                message: "Could not load requested article." + err
            });
        } else {
            res.json(404, {
                message: "The requested article was not found!"
            });
        }
    });
}


/**
 * Creates new article
 * @param {Object} req is the user request.
 * @return {Object} res is the API response.
 */
exports.create = function(req, res) {

    var article_headline = req.body.article_headline,
        article_fullContent = req.body.article_fullContent,
        article_channel = req.body.article_channel,
        article_status = req.body.article_status,
        article_author = req.body.article_author;

    Article.findOne({
        headline: {
            $regex: new RegExp(article_headline, "i")
        }
    }, function(err, doc) {
        if (!err && !doc) {

            var newArticle = new Article();

            newArticle.headline = article_headline;
            newArticle.fullContent = article_fullContent;
            newArticle.channel = article_channel;
            newArticle.statuss = article_status;
            newArticle.author = article_author;

            newArticle.save(function(err) {
                if (!err) {
                    res.json(201, {
                        message: "Article with headline: " + newArticle.headline + " was successfully created!"
                    });
                } else {
                    res.json(500, {
                        message: "Could not create article. Error: " + err
                    });
                }

            });

        } else if (!err) {

            res.json(403, {
                message: "An existing article has the same headline, please update it or create a new one with a different headline."
            });

        } else {
            res.json(500, {
                message: err
            });
        }
    });

}


/**
 * Updates article with given id
 * @param {Object} req is the user request.
 * @return {Object} res is the API response.
 */
exports.update = function(req, res) {

    var id = req.body.id,
        headline = req.body.article_headline,
        fullContent = req.body.article_fullContent,
        channel = req.body.article_channel,
        author = req.body.article_author,
        statuss = req.body.article_statuss;

    Article.findById(id, function(err, doc) {
        if (!err && doc) {
            doc.headline = headline;
            doc.fullContent = fullContent;
            doc.channel = channel;
            doc.author = author;
            doc.statuss = statuss;

            doc.save(function(err) {
                if (!err) {
                    res.json(200, {
                        message: "Article updated: " + headline
                    });
                } else {
                    res.json(500, {
                        message: "Could not update article. " + err
                    });
                }
            });
        } else if (!err) {
            res.json(404, {
                message: "Could not find article."
            });
        } else {
            res.json(500, {
                message: "Could not update article." + err
            });
        }
    });
}


/**
 * Deletes article with given id
 * @param {Object} req is the user request.
 * @return {Object} res is the API response.
 */
exports.delete = function(req, res) {

    var id = req.body.id;
    Article.findById(id, function(err, doc) {
        if (!err && doc) {
            doc.remove();
            res.json(200, {
                message: "Article removed."
            });
        } else if (!err) {
            res.json(404, {
                message: "Could not find article."
            });
        } else {
            res.json(403, {
                message: "Could not delete article. " + err
            });
        }
    });
}