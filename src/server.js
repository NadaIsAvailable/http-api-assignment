const http = require('http');
const htmlHandler = require('./htmlHandler.js');
const jsonHandler = require('./jsonHandler.js');
const utils = require('./utils.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    '/': htmlHandler.getClient,
    '/style.css': htmlHandler.getStyle,
    '/success': jsonHandler.getSuccess,
    '/badRequest': jsonHandler.getBadRequest,
    '/unauthorized': jsonHandler.getUnauthorized,
    '/forbidden': jsonHandler.getForbidden,
    '/internal': jsonHandler.getInternal,
    '/notImplemented': jsonHandler.getNotImplemented,
    notFound: jsonHandler.getNotFound,
};

const onRequest = (request, response) => {
    const parsedURL = utils.parseURL(request);

    if (urlStruct[parsedURL.pathname]) {
        urlStruct[parsedURL.pathname](request, response);
    } else {
        urlStruct.notFound(request, response);
    }
};

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
});