import axios from "axios";

let baseUrl="http://localhost:2410";
function get(url){
    console.log(url);
    return axios.get(baseUrl+url);
};
export default {
    get,
}