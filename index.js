
let btnArray = [];

onLoad();

function onLoad() {
    let bagItem = JSON.parse(localStorage.getItem('bagitem'));
    btnArray = bagItem ? bagItem : [];

    displayCards(/*items*/);
    
    displayBagItem();

    // localStorage.clear();
}



function displayCards(/*items*/) {

    let containerElement = document.querySelector('.container');

    if(containerElement==null){
        return;
    }

    let newHtml = '';

    items.forEach(item => {
        newHtml += `<div class="card">

        <a href="#"><img src="${item.image}" class="image"></a>
        <div class="about">

            <div class="rating">${item.rating.stars} ⭐ | ${item.rating.likes}k</div>
            <h class="company">${item.company}</h>
            <p class="item_info">${item.about}</p>
            <div class="price">
                <span class="rate">
                    Rs. ${item.price.rate}
                </span>
                <span class="orignal-price">Rs.${item.price.originalPrice}</span>
                <span class="discount">(${item.price.discount}%OFF)</span>
            </div>
        </div>
        <a href="#">
        <button class="btn" onclick="addToBag(${item.id});">Add To Bag</button>
        </a></div>`}


    );

    containerElement.innerHTML = newHtml;


}


function addToBag(i) {

    btnArray.push(i);
    localStorage.setItem('bagitem', JSON.stringify(btnArray));
    console.log(i);

    displayBagItem();

}

function displayBagItem() {
    let bagElement = document.querySelector('.bagitem');

    if (btnArray.length > 0) {
        bagElement.style.visibility = "visible";
        bagElement.innerHTML = btnArray.length;
    }
    else {
        bagElement.style.visibility = "hidden";

    }
}
console.log(btnArray);
