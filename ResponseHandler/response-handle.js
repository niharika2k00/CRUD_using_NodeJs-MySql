

export const ErrorHandler = (statusCode, req, res, msg, err) => {
    console.log(err, statusCode);
    const Obj = {
        success: false,
        path: req.path,
        Error: err,
        ErrorCode: res.statusCode,
        ErrorMessage: res.statusMessage,
        method: req.method,
        message: msg,
    };
    return Obj;
}


export const SuccessHandler = (data, message) => ({
    success: true,
    status: 'Success',
    message: message || 'Success',
    data,
});


