import axios from 'axios';
import {proxy, api_id, key} from "../config";
export default class  Recipe {
    constructor(id) {
        this.id = id;
    }
    async getRecipe() {
        try {
            const res   = await axios(`${proxy}https://api.edamam.com/api/food-database/v2/parser?nutrition-type=logging&ingr=${this.id}&app_id=${api_id}&app_key=${key}`);
            this.result = res.data.hints;
            const renderRecipes = recipes => {
                this.title    = recipes.food.category;
                this.author   = recipes.food.brand;
                if(typeof(this.author) !== "undefined") {
                    this.author = recipes.food.brand;
                } else {
                    this.author =  'I am man the who is cooking';
                }
                this.category = recipes.food.categoryLabel;
                this.label    = recipes.food.label;
                this.image    = recipes.food.image;
                if(typeof(this.image) !== "undefined") {
                    this.image   = recipes.food.image;
                } else {
                    this.image   =  'https://imgetage.freepik.com/free-vector/good-food-logo-template_79169-17.jpg';
                }
                this.url      = recipes.measures[0].uri;
                let random = "1/" + (Math.floor(Math.random() * 8) + 1) + " ";
                const arr = recipes.food.foodContentsLabel.split('.');
                this.ingredients = [];
                arr.forEach((el) => {
                   this.ingredients.push(random.concat(el));
                });
                this.servingSizes = recipes.food.servingSizes;
            };

            this.result.forEach(renderRecipes);
        }
        catch (error) {
            alert('Some thing went Wrong :(');
        }
    }
    calcTime() {
        // Assuming that we need 15 min for each ingredients
        const numIng =this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }
    calcServing() {
        this.serving = 4;
    }
    parseIngredients(){
        const unitLong  = ['tablespoons', 'tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pounds'];
        const unitShort = ['tbsp','tbsp', 'oz', 'oz', 'tsp','cup','pound'];
        const newIngredients = this.ingredients.map(el => {
            // 1) Uniform units
            let ingredient = el.toLowerCase();
            unitLong.forEach((unit, i) => {
               ingredient = ingredient.replace(unit, unitShort[i]);
            });
            // 2) Remove parentheses

            ingredient = ingredient.replace(/ *\([^)]*\) */g, "");
            // 3) Parse ingredients into count, unit and the ingredient
            return ingredient;
        });
        this.ingredients = newIngredients;
    }
 }
