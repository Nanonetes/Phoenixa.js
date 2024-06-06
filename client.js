const http = require('node:http');

const agent = new http.Agent({keepAlive: true});

const request = http.request({
  agent: agent,
  hostname: 'localhost',
  port: 8050,
  method: 'POST',
  path: '/create-post',
  headers: {
    'Content-Type': 'application/json',
    name: 'Jane',
  },
});

// Request Body
request.end(JSON.stringify({
  title: 'ServerSideProgramming',
  body: 'Web Servers in the......it.',
}));

// Response Event is emitted only once
request.on('response', response => {
  console.log('------- STATUS -------');
  console.log(response.statusCode);
  console.log(response.statusMessage);
  
  console.log('------- HEADERS -------');
  console.log(response.headers);
  
  console.log('------- BODY -------');
  response.on('data', chunk => {
    console.log(chunk.toString('utf8'));
  })
  
  response.on('end', () => {
    console.log('No more data in the response.');
  });
});
