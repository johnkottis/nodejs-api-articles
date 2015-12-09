var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var workoutSchema = new Schema({
    headline: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true
        }
    },
    fullContent: {
        type: String,
        required: true
    },
    channel: {
        type: String,
        required: true,
        default: "news"
    },
    statuss: {
        type: String,
        required: true,
        default: "draft"
    },
    author: {
        type: String,
        required: true,
        default: "copywriters team"
    },
    date_created: {
        type: Date,
        required: true,
        default: Date.now
    }
});

var article = mongoose.model('article', workoutSchema);

module.exports = {
    Article: article
};