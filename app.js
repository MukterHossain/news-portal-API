const loadCategory = async() =>{
 const response = await fetch('https://openapi.programming-hero.com/api/news/categories')
const data = await response.json();

const categoryContainer = document.getElementById('category-bar-container');
data.data.news_category.forEach((item) =>{
    const div = document.createElement('div');
    div.innerHTML = `<button onclick="loadNews('${item.category_id}')">${item.category_name}</button>`;
    categoryContainer.appendChild(div);
})

}



const loadNews = async(catId) =>{
    document.getElementById('loading-spiner').style.display = 'block';
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${catId}`);
    const data = await response.json();

    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    data.data.forEach((item) => {
        document.getElementById('loading-spiner').style.display = 'none';
        const div = document.createElement('div');
        div.classList.add('singleNews');
        div.innerHTML = `
        <div class="news-photo">
            <img src="${item.image_url}" alt="">
        </div>
        <div class="news-info">
            <div class="news-header">
                <h4>${item.title}</h4>
                <p class="news-badge">
                ${item.rating.badge}<sup><h6 class="news-rating">${item.rating.number}</h6></sup>
                </p>
            </div>
            <p>${item.details.slice(0, 200)}</p>

            <div class="news-footer">
                <div class="author">
                     <div class="">
                        <img class="author-image" src="images/jacket-2.png" alt="">
                    </div>
                    <div class="author-info">
                        <h6>MD. David</h6>
                        <p>Date: 12-12-2004</p>
                    </div>
                </div>
                <div class="views author">
                    <img class="views-img" src="images/jacket-3.png" alt="">
                    <p>450</p>
                </div>
                <div class="details-btn-container">
                     <button onclick="check('${item.title}')" class="details-btn">Details</button>
                </div>
            </div>
       </div>
    `;

    newsContainer.appendChild(div)

    })
}

const check = (text)=>{
    console.log(text)
}

const handleSearch =() =>{
    const value = document.getElementById('search-box').value;
    if(value){
        loadNews(value)
    }
    else{
        alert('Please enter a valid catID')
    }
}



loadNews('01')
loadCategory()