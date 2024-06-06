const http = require('node:http');

const server = http.createServer();

server.listen(8050, 'localhost', () => {
  console.log(`Server listening on http://localhost:8050`);
});

server.on('request', (request, response) => {
  console.log('------- METHODS -------');
  console.log(`Method:`, request.method);
  
  console.log('------- HTTP VERSION -------');
  console.log(`Version:`, request.httpVersion);
  
  console.log('------- URL -------');
  console.log(`URL:`, request.url);
  
  const name = request.headers.name.toString("utf-8");
  let data = '';
  
  // Collecting Data
  request.on('data', chunk => {
    data += chunk.toString();
  });
  
  console.log('------- BODY -------');
  request.on('end', () => {
    console.log(data);
    data = JSON.parse(data);
    const postTitle = data.title.toString("utf-8");
    
    // Response
    response.writeHead(200, 'Success', {'Content-Type': 'application/json'});
    response.write(JSON.stringify({message: `Post Title: ${postTitle} created by ${name}`}));
  });
});
