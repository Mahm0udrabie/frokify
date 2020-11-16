import {elements} from "./base";
export const getInput = () => elements.searchInput.value;
export const clearInput = ()=> {
    elements.searchInput.value = '';
};
export const clearResults = ()=> {
    elements.searchResultList.innerHTML = '';
    elements.searchResPages.innerHTML = '';

};
const limitRecipeTitle = (title ,limit = 17) => {
    const newTitle = [];
    if(title.length> limit) {
        title.split(' ').reduce((acc, curr) => {
            if(acc + curr.length <= limit) {
                newTitle.push(curr);
            }
            return acc + curr.length;
        },0);
        return `${newTitle.join(' ')} ...)`;
    }
    return title;
};
const renderRecipe = recipe => {
    let arr = recipe.food;
    if(typeof(arr.image) !== "undefined") {
        arr.image   = arr.image;
    } else {
        arr.image   =  'https://image.freepik.com/free-vector/good-food-logo-template_79169-17.jpg';
    }
    const markup = `
          <li>
            <a class="likes__link" href="#${arr.foodId}">
                <figure class="likes__fig">
                     <img src="${arr.image}" alt="${limitRecipeTitle(arr.category)}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitRecipeTitle(arr.label)}</h4>
                    <p class="likes__author">${limitRecipeTitle(arr.category)}</p>  
                </div>
            </a>
         </li>
    `;
    elements.searchResultList.insertAdjacentHTML('beforeend',markup);
};
const createButton = (page, type) => `
                <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type === 'prev' ?'left': 'right'}"></use>
                    </svg>
                    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
                </button>
       
`;
const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil( numResults / resPerPage);
    let button;
    if (page === 1 ) {
        // Button to go to next page
        button =  createButton(page, 'next');
    } else if(page < pages) {
        // Both buttons
        button = `${createButton(page, 'prev')}
                  ${createButton(page, 'next')}`;
    }
    else if(page === pages && pages > 1) {
        // Only button to go to prev page
        button =  createButton(page, 'prev');
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin',button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // render results of current page
    const start = (page - 1) * resPerPage; // 0   10   20
    const end   = page * resPerPage;       // 10  20   30
    recipes.slice(start, end).forEach(renderRecipe);
    // render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
}