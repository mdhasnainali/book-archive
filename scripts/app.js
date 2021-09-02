const bookSearch = () => {
    cleanPreviousResults();
    tooggleWarning(false);
    tooggleTotalResults(false);
    tooggleSpinner(true);
    const searchText = document.getElementById('search-input');
    const url = `http://openlibrary.org/search.json?q=${searchText.value}`;
    searchText.value = '';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.numFound !== 0) {
                showSearchResult(data.docs.slice(0,30));
                tooggleTotalResults(true,data.docs.slice(0,30).length,data.numFound);
                // console.log(data.numFound);
                // console.log(data.docs.length);
            }
            else {
                console.log('No Result Found');
                tooggleWarning(true);
            }
            tooggleSpinner(false);
        });
}

const tooggleTotalResults = (value,size = 0,total = 0) => {
    totalResult = document.getElementById('total-results');
    if(value){
        totalResult.style.display = 'block';
        totalResult.innerText = `Showing ${size} of ${total} results`;
    }
    else{
        totalResult.style.display = 'none';
    }
}

const tooggleSpinner = (value) => {
    totalResult = document.getElementById('spinner');
    if(value){
        totalResult.classList.remove('d-none');
    }
    else{
        totalResult.classList.add('d-none');
    }
}

const tooggleWarning = (value) => {
    totalResult = document.getElementById('warning');
    if(value){
        totalResult.style.display = 'block';
        totalResult.innerText = `No search result found. Please search with proper word`;
    }
    else{
        totalResult.style.display = 'none';
    }
}

const cleanPreviousResults = () => {
    const searchResultsContainer = document.getElementById('search-result-container');
    var child = searchResultsContainer.lastElementChild; 
    while (child) {
        searchResultsContainer.removeChild(child);
        child = searchResultsContainer.lastElementChild;
    }
}

const showSearchResult = (searchResults) => {
    const searchResultsContainer = document.getElementById('search-result-container');
    searchResults.forEach(result => {
        const div = document.createElement('div');
        div.classList.add('col');
        const imgSrc = result.cover_i ? `https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg` : `./images/not-found.jpg`
        div.innerHTML = `
        <div class="card h-100">
            <img src="${imgSrc}" class="card-img-top" alt="Book Image">
            <div class="card-body">
                <h5 class="card-title text-primary text-center fw-bold">${result.title}</h5>
                <p><span class ="text-primary fw-bold">Author:</span> ${result.author_name ? result.author_name[0] : 'No Author Found'}</p>
                <p><span class ="text-primary fw-bold">Publishers:</span> ${result.publisher ? result.publisher[0] : 'No Publisher Found'}</p>
                <p><span class ="text-primary fw-bold">First Publish Year:</span> ${result.first_publish_year ? result.first_publish_year : 'No First Publish Year Found'}</p>
        </div>
        </div>
        `
        searchResultsContainer.appendChild(div);
    });
}

