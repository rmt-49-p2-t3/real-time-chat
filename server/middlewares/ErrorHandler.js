function errorHandlers(err, req, res, next) {
    let status = err.status || 500;
    let message = err.message || 'Internal server error';
    switch (err.name) {
        case 'SequelizeValidationError':
            status = 400;
            message = err.errors[0].message;
            break;
        case 'CustomErrorRequired':
            status = 400;
            message = 'Email and password are required';
            break;
        case 'CustomErrorInvalidCredentials':
            status = 401;
            message = 'Invalid email or password';
            break;
        case 'CustomErrorNotFound':
            status = 404;
            message = 'Resource not found';
            break;
        case 'CustomErrorUnauthorized':
            status = 403;
            message = 'You are not authorized to perform this action';
            break;
        case 'JsonWebTokenError':
            status = 401;
            message = 'Invalid token';
            break;
        case 'CustomErrorEmailExist':
            status = 409;
            message = 'Email already exists';
            break;
    }
    res.status(status).json({ message });
}

module.exports = errorHandlers;