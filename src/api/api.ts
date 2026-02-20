import axios from "axios";
import { axiosConfig } from "../libs/axios/config";

export const api = axios.create(axiosConfig);