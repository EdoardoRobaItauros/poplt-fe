import { axiosInstance } from "../config/config.js"

const QueryService = {
    get: function (tableName) {
        return axiosInstance.get(tableName)
    },
    getById: function (tableName, id) {
        return axiosInstance.get(tableName + "/" + id)
    },
    getWithPaginationAndJoin: function (tableName, pageNum, itemsPerPage) {
        return axiosInstance.get(`${tableName}?${pageNum}&${itemsPerPage}`)
    },
    post: function (tableName, body) {
        const res = axiosInstance.post(tableName, body)
        return res
    },
    put: function (tableName, id, body) {
        return axiosInstance.put(tableName + "/" + id, body)
    },
    delete: function (tableName, id) {
        const res = axiosInstance.delete(tableName + "/" + id)
        return res
    }
}

export default QueryService;