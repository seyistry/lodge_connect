import { getReasonPhrase } from "http-status-codes"

export const successResponse = (res, message, payload, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        payload: { ...payload }
    })
}


export const errorResponse = (res, message, statusCode) => {
    const reason = getReasonPhrase(statusCode);
    return res.status(statusCode).json({
        success: false,
        error: {
            type: reason,
            code: statusCode,
            message: message
        }
    })
}