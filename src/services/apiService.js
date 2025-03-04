import backendClient from "./api.js";

export const fetchPotStocks = async () => {
    const response = await backendClient.get("/pot-stock")
    return response.data;
};

export const fetchPotStocksMinimal = async () => {
    const response = await backendClient.get("/pot-stock/minimal")
    return response.data;
};

export const fetchProductions =  async () => {
    const response =  await backendClient.get("/production")
    return response.data;
};

export const fetchProductionsFromPotStock =  async (potStockId) => {
    const response =  await backendClient.get(`pot-stock/production/${potStockId}`)
    return response.data;
};

export const fetchSales =  async () => {
    const response =  await backendClient.get("/sales")
    return response.data;
};


export const fetchSellers =  async () => {
    const response =  await backendClient.get("/sales/sellers")
    return response.data;
};

export const fetchIncomes =  async () => {
    const response =  await backendClient.get("/income")
    return response.data;
};

export const fetchExpenses =  async () => {
    const response =  await backendClient.get("/expense")
    return response.data;
};

export const addNewProduction =  async (potStockId, production) => {
    const response =  await backendClient.post(`/production?potStockId=${potStockId}`,production)
    return response.data;
};

export const addNewIncome =  async (salesId, income) => {
    const response =  await backendClient.post(`/income?salesId=${salesId}`,income)
    return response.data;
};

export const addNewOperationalExpense =  async (salesId, expense) => {
    const response =  await backendClient.post(`/expense/operation?salesId=${salesId}`,expense)
    return response.data;
};

export const addNewCapitalExpense =  async (potStockId, expense) => {
    const response =  await backendClient.post(`/expense/capital/${potStockId}`,expense)
    return response.data;
};

export const addNewSale =  async (productionId, sale) => {
    const response =  await backendClient.post(`/sales?productionId=${productionId}`,sale)
    return response.data;
};

export const editSale =  async (salesId, sale) => {
    const response =  await backendClient.put(`/sales/${salesId}`,sale)
    return response.data;
};


