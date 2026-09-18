const parseURL = (request) => {
    const protocol = request.connection.encrypted ? 'https' : 'http';
    return new URL(request.url, `${protocol}://${request.headers.host}`);
};

const buildXML = (elements) => {
    let xml = '<response>';

    for (const [key, value] of Object.entries(elements)) {
        xml += `<${key}>${value}</${key}>`;
    }
    xml += '</response>';

    return xml;
};

module.exports = {
    parseURL,
    buildXML,
};