import axios from 'axios';
import {proxy, api_id, key} from "../config";

export default class Search {
    constructor(query) {
        this.query = query;
    }
async  getResults() {
    try {
        const res = await axios(`${proxy}https://api.edamam.com/api/food-database/v2/parser?nutrition-type=logging&ingr=${this.query}&app_id=${api_id}&app_key=${key}`);
        this.result = res.data.hints;
        //console.log(this.result);
    }
    catch (error) {
        alert(error);
    }
}

}