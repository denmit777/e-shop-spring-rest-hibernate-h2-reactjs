import axios from 'axios';

const GOODS_API_BASE_URL_FOR_BUYER = "http://localhost:8081/goods/forBuyer"
const GOODS_API_BASE_URL_FOR_ADMIN = "http://localhost:8081/goods/forAdmin"

class GoodService {

    getAllGoodsForBuyer() {
        return axios.get(GOODS_API_BASE_URL_FOR_BUYER);
    }

    getAllGoods() {
        return axios.get(GOODS_API_BASE_URL_FOR_ADMIN);
    }

    getAllSortedGoods = (sortField) => {
        return axios.get(GOODS_API_BASE_URL_FOR_ADMIN + '?sortField=' + sortField);
    }

    getAllDescSortedGoods = (sortField) => {
        return axios.get(GOODS_API_BASE_URL_FOR_ADMIN + '?sortField=' + sortField + '&sortDirection=desc');
    }

    getAllGoodsByPages = (pageSize, pageNumber) => {
        return axios.get(GOODS_API_BASE_URL_FOR_ADMIN + '?pageSize=' + pageSize + '&pageNumber=' + pageNumber);
    }

    getAllGoodsSearchedById = (parameter, pageSize) => {
        return axios.get(GOODS_API_BASE_URL_FOR_ADMIN + '?searchField=id&parameter=' + parameter + '&pageSize=' + pageSize);
    }

    getAllGoodsSearchedByTitle = (parameter, pageSize) => {
        return axios.get(GOODS_API_BASE_URL_FOR_ADMIN + '?searchField=title&parameter=' + parameter + '&pageSize=' + pageSize);
    }

    getAllGoodsSearchedByPrice = (parameter, pageSize) => {
        return axios.get(GOODS_API_BASE_URL_FOR_ADMIN + '?searchField=price&parameter=' + parameter + '&pageSize=' + pageSize);
    }

    getAllGoodsSearchedByDescription = (parameter, pageSize) => {
        return axios.get(GOODS_API_BASE_URL_FOR_ADMIN + '?searchField=description&parameter=' + parameter + '&pageSize=' + pageSize);
    }

    addGood(good) {
        return axios.post(GOODS_API_BASE_URL_FOR_ADMIN, good);
    }

    getGoodById(goodId) {
        return axios.get(GOODS_API_BASE_URL_FOR_ADMIN + '/' + goodId);
    }

    updateGood(good, goodId) {
        return axios.put(GOODS_API_BASE_URL_FOR_ADMIN + '/' + goodId, good);
    }

    deleteGood(goodId) {
        return axios.delete(GOODS_API_BASE_URL_FOR_ADMIN + '/' + goodId);
    }

    getTotalAmount() {
        return axios.get(GOODS_API_BASE_URL_FOR_ADMIN + '/total');
    }
}

export default new GoodService()