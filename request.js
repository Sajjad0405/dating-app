var request = require('request');

request('https://aws.random.cat/meow', function (error, response, body) {

  console.log('error:', error);
  console.log('statusCode:', response);
  console.log('body:', body);

});
