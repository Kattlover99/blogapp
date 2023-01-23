import axios from "axios";
import { LoadingHelper } from "../helpers/LoadingHelper";

//process.env.NEXT_PUBLIC_API_URL + '/api'

export default class HttpService {
  constructor() {
    //@ts-ignore
    this.axios = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
    });

    this.quantidadeRequisicoes = 0;
    //@ts-ignore
    this.axios.interceptors.request.use((config) => {
      this.quantidadeRequisicoes++;

      if (this.quantidadeRequisicoes === 1) {
        LoadingHelper.exibir();
      }
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    });
    //@ts-ignore
    this.axios.interceptors.response.use((response) => {
      this.quantidadeRequisicoes--;
      if (this.quantidadeRequisicoes === 0) {
        LoadingHelper.oculto();
      }
      return response;
    });
  }
  async post(url, data) {
    //@ts-ignore
    const res = await this.axios.post(url, data);
    return res;
  }
  async get(url) {
    //@ts-ignore
    return await this.axios.get(url);
  }
  async put(url, data) {
    //@ts-ignore
    return await this.axios.put(url, data);
  }
}
