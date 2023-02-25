import axios from "axios";
import { back_ip, back_port } from "./settings";

export async function getUser() {
    return axios.get(`http://${back_ip}:${back_port}/getuser`).then((res) => {
        return res.data;
    })
}
