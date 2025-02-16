import axios from "axios";

const API_URL:string = "https://localhost:7071/";

export async function getUsers() {
    const responce = await axios.get<string[]>(API_URL + "u");
    await new Promise(r => setTimeout(r, 1000));

    return responce.data;
}