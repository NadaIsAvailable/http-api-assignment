const fs = require('fs');

const client = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);

const respond = (request, response, statusCode, contentType, content) => {
    response.writeHead(statusCode, { "Content-Type": contentType });
    response.write(content);
    response.end();
};

const getClient = (request, response) => respond(request, response, 200, 'text/html', client);

const getStyle = (request, response) => respond(request, response, 200, 'text/css', style);

module.exports = {
    getClient,
    getStyle
};