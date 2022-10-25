const success = (status, data) => {
    return { status: status, data: data}
};

const error = (status, message) => {
    return { status: status, message: message, data: {}}
};

module.exports = {
    success,
    error
};