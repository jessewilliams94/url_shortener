// const AWS = require('aws-sdk');
// const config = require('./../../config.js');
// const uuidv1 = require('uuid/v1');

// const getURLs = function (req, res) {
//     AWS.config.update(config.aws_remote_config);

//     const docClient = new AWS.DynamoDB.DocumentClient();

//     const params = {
//         TableName: config.URL
//     };

//     docClient.scan(params, function (err, data) {

//         if (err) {
//             console.log(err)
//             res.send({
//                 success: false,
//                 message: err
//             });
//         } else {
//             const { Items } = data;
//             res.send({
//                 success: true,
//                 movies: Items
//             });
//         }
//     });
// }

// const addURL = function (req, res) {
//     AWS.config.update(config.aws_remote_config);
//     const docClient = new AWS.DynamoDB.DocumentClient();
//     const Item = { ...req.body };
//     Item.id = uuidv1();
//     var params = {
//         TableName: config.URL,
//         Item: Item
//     };

//     // Call DynamoDB to add the item to the table
//     docClient.put(params, function (err, data) {
//         if (err) {
//             res.send({
//                 success: false,
//                 message: err
//             });
//         } else {
//             res.send({
//                 success: true,
//                 message: 'Added URL',
//                 url: data
//             });
//         }
//     });
// }

// module.exports = {
//     getURLs,
//     addURL
// }