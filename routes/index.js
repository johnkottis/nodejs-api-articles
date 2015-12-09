/**
 * Title:       index.js
 * Description: GET home page
 * Version:     0.0.1
 * Author:      John Kottis
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};