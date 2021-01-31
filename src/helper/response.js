module.exports = {
    success: (res, message, pagination, data) => {
        const response = {
            code: 200,
            message,
            pagination,
            data,
        }
        res.json(response)
    },
    noData: (res, message) => {
        const response = {
            code: 404,
            message,
        }
        res.json(response)
    },
    failed: (res, message) => {
        const response = {
            code: 500,
            message,
        }
        res.json(response)
    },
}