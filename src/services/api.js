import axios from "axios";

const backendClient = axios.create({
    baseURL: "http://localhost:8080/mushroom-analyzer/backend/api/v1"
});

export default backendClient;