const displayArea = document.getElementById('display-area');
displayArea.textContent = "";
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
// const toggleSearchResult = displayStyle => {
//     document.getElementById('display-area').style.display = displayStyle;
// }

const getSearchedText = () => {

    const searchedText = document.getElementById('search-text').value;
    toggleSpinner('block');
    // toggleSearchResult('none');
    if (searchedText.length == 1) {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchedText}`)
            .then(res => res.json())
            .then(data => loadSearchedItems(data))

    }
    else {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchedText}`)
            .then(res => res.json())
            .then(data => loadSearchedItems(data))

    }
    document.getElementById('search-text').value = "";
}
const loadSearchedItems = drinksList => {
    const displayArea = document.getElementById('display-area');
    displayArea.textContent = "";
    spinner.style.display = "block";
    if (drinksList.drinks == undefined) {
        displayArea.innerHTML = `<h1 class="invalid-text">Invalid Search</h1>`;
        spinner.style.display = "none";
    }
    else {
        for (const drink of drinksList.drinks) {


            const createDiv = document.createElement('div');
            createDiv.innerHTML = `<div class="card per-card rounded">
            <img src="${drink.strDrinkThumb ? drink.strDrinkThumb : ''}" width="200px" height="200px" class="card-img-top rounded" alt="...">
            <div class="card-body">
                <h5 class="card-title text-center text-white card-heading">${drink.strDrink}</h5>
              
                <button type="button" onclick="fetchInfo('${drink.idDrink}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="btn py-2 px-5 text-white more-details-button">More Details...</button>
          
            </div>
        </div>`;
            displayArea.appendChild(createDiv);

        }
        toggleSpinner('none');
        // toggleSearchResult('block');
    }


}

const fetchCocktails = () => {
    toggleSpinner('block');
    // toggleSearchResult('none');
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail')
        .then(res => res.json())
        .then(data => loadCocktails(data))



}
fetchCocktails();
const loadCocktails = coctailsContainer => {



    for (const drink of coctailsContainer.drinks) {
        // console.log(drink);
        const createDiv = document.createElement('div');
        createDiv.innerHTML = `<div class="card per-card rounded">
        <img src="${drink.strDrinkThumb ? drink.strDrinkThumb : ''}" width="200px" height="200px" class="card-img-top rounded" alt="...">
        <div class="card-body">
            <h5 class="card-title text-center text-white card-heading">${drink.strDrink}</h5>
          
            <button type="button" onclick="fetchInfo('${drink.idDrink}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="btn py-2 px-5 text-white more-details-button">More Details...</button>
      
        </div>
    </div>`;
        displayArea.appendChild(createDiv);
    }
    toggleSpinner('none');
    // toggleSearchResult('block');
}


const fetchInfo = id => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => loadInfo(data))
}

const loadInfo = id => {

    const infoDisplay = document.getElementById('staticBackdrop');
    infoDisplay.textContent = "";
    for (const drink of id.drinks) {
        console.log(drink);

        infoDisplay.innerHTML = ` <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-center" id="staticBackdropLabel">${drink.strDrink}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <img src="${drink.strDrinkThumb}" class="img-fluid">
                <p class="fs-4 mt-3 fst-italic">Instruction:${drink.strInstructions}</p>
                <p class="fs-4 fst-italic">Alchohol Status:${drink.strAlcoholic}</p>
                <p class="fs-4 fst-italic">Catagory:${drink.strCategory}</p>
                
            </div>
        <ul id="ingredient-list">
            <li class="fs-5">Ingridient-1:${drink.strIngredient1}</li>
            <li class="fs-5">Ingridient-2:${drink.strIngredient2}</li>
            <li class="fs-5">Ingridient-3:${drink.strIngredient3}</li>
            <li class="fs-5">Ingridient-4:${drink.strIngredient4}</li>
            <li class="fs-5">Ingridient-5:${drink.strIngredient5}</li>
        </ul>
        </div>
    </div>`;
    }



}
