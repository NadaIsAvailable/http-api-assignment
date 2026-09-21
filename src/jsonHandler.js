const utils = require('./utils.js');

const respond = (request, response, statusCode, contentType, content) => {
    if (contentType === 'text/xml') {
        content = utils.buildXML(content);
    } else {
        content = JSON.stringify(content);
    }
    
    response.writeHead(statusCode, { 'Content-Type': contentType });
    response.write(content);
    response.end();
};

const getSuccess = (request, response) => {
    let contentType = utils.getContentType(request);
    let content = {
        'message': 'This is a successful response',
    };
    respond(request, response, 200, contentType, content);
};

const getBadRequest = (request, response) => {
    let contentType = utils.getContentType(request);
    let content = {
        'message': 'Missing valid query parameter set to true',
        'id': 'badRequest',
    };

    const parsedURL = utils.parseURL(request);
    const valid = parsedURL.searchParams.get('valid'); 

    if (valid === null || !valid || valid !== 'true') {
        return respond(request, response, 400, contentType, content);
    }

    content = {
        'message': 'This request has the required parameters',
    };

    respond(request, response, 200, contentType, content);
};

const getUnauthorized = (request, response) => {
    let contentType = utils.getContentType(request);
    let content = {
        'message': 'Missing loggedIn query parameter set to yes',
        'id': 'unauthorized',
    };
    
    const parsedURL = utils.parseURL(request);
    const loggedIn = parsedURL.searchParams.get('loggedIn'); 

    if (loggedIn === null || !loggedIn || loggedIn !== 'yes') {
        return respond(request, response, 401, contentType, content);
    }

    content = {
        'message': 'You have successfully viewed the content.',
    };

    respond(request, response, 200, contentType, content);
};

const getForbidden = (request, response) => {
    let contentType = utils.getContentType(request);
    let content = {
        'message': 'You do not have access to this content.',
        'id': 'forbidden',
    };
    respond(request, response, 403, contentType, content);
};

const getInternal = (request, response) => {
    let contentType = utils.getContentType(request);
    let content = {
        'message': 'Internal Server Error. Something went wrong.',
        'id': 'internalError',
    };
    respond(request, response, 500, contentType, content);
};

const getNotImplemented = (request, response) => {
    let contentType = utils.getContentType(request);
    let content = {
        'message': 'A get request for this page has not been implemented yet. Check again later for updated content.',
        'id': 'notImplemented',
    };
    respond(request, response, 501, contentType, content);
};

const getNotFound = (request, response) => {
    let contentType = utils.getContentType(request);
    let content = {
        'message': 'The page you are looking for was not found.',
        'id': 'notFound',
    };
    respond(request, response, 404, contentType, content);
};

module.exports = {
    getSuccess,
    getBadRequest,
    getUnauthorized,
    getForbidden,
    getInternal,
    getNotImplemented,
    getNotFound,
};