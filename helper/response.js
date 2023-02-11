let log = require('../helper/logger');

let errors = {
    400: {
        status: 400,
        errorCode: 'BAD_REQUEST',
        error: 'Bad request'
    },
    401: {
        status: 401,
        errorCode: 'UNAUTHORIZED',
        error: 'Not authorized'
    },
    404: {
        status: 404,
        errorCode: 'NOT_FOUND',
        error: 'Not found'
    },
    409: {
        status: 409,
        errorCode: 'DATA_CONFLICT',
        // error: 'Data do not match'
        error: 'Already exists.'
    },
    500: {
        status: 500,
        errorCode: 'SERVER_ERROR',
        error: 'Server error'
    },

}

module.exports = {
    responseMiddleware: (req, res, next) => {
        res.errors = errors;
        res.successRes = function (code, resData) {
            res.status(code).json({
                status: 'SUCCESS',
                data: resData
            });
        };
        res.successListRes = function (code, resData) {
            if (resData.sort) {
                for (let key in resData.sort) {
                    resData.sort[key] = resData.sort[key] === 1 ? 'asc' : 'desc';
                }
            }
            res.status(code).json({
                status: 'SUCCESS',
                ...resData
            });
        }
        res.errorRes = function (code, errMsg) {
            const errorRes = {
                error: errMsg || errors[code].error,
                errorCode: errors[code].errorCode
            }
            res.status(errors[code].status).json(errorRes);
        }
        res.customRes = function (status, error, errorCode) {
            res.status(status).json({
                error: error,
                errorCode: errorCode || 'Internal server error.'
            });
        }
        next();
    }
}