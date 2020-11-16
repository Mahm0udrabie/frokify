import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from './views/SearchView'
import {elements, renderLoader, clearLoader} from "./views/base";

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};
/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
    // 1) Get query from view
    // const query = searchView.getInput();
    const query = 'pizza';

    if (query) {
        // 2 new search and object and add to state
        state.search = new Search(query);
        //Testing
        // 3) Prepare UI for results
        searchView.clearResults();
        searchView.clearInput();
        renderLoader(elements.searchRes);
        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
        console.log(state.search.result);
    }
}
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});
window.addEventListener('load', e => {
    e.preventDefault();
    controlSearch();
});
elements.searchResPages.addEventListener('click', e=> {
    const btn = e.target.closest('.btn-inline');
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto,10);
        searchView.clearResults();
        searchView.renderResults(state.search.result,goToPage);
    }
});
/**
 * RECIPE CONTROLLER
 */
// const r = new Recipe('food_ancgrgobl2nhh0anlnv1aagri8ic');
// r.getRecipe();
// console.log(r);
//food_ancgrgobl2nhh0anlnv1aagri8ic
//food_at830s9amds32fb8w6ufmaopzk8n
const controlRecipe = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#','');
    console.log(id);
    if(id) {
        // Prepare UI for changes

        // Create new recipe object
        state.recipe = new Recipe(id);
        window.r = state.recipe;

        try {
            // Get recipe data
            await state.recipe.getRecipe();
            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServing();
            state.recipe.parseIngredients();
            // Render recipe
            console.log(state.recipe);
        }
        catch (err) {
            alert('error processing recipe!');
        }

    }
}
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
['hashchange','load'].forEach(event => window.addEventListener(event,controlRecipe));