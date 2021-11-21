

export const ErrorHandler = (statusCode, req, res, msg, err) => {
    console.log(err, statusCode);
    res.status(statusCode).json({
        path: req.path,
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        method: req.method,
        message: msg,
    });
    return res.status(statusCode).json();
}