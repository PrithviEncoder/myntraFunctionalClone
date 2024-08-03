const CONVENIENCE_FEE = 99;
let bagCart = [];
onLoad();
function onLoad() {
    accessObject();
    displayBagitem();
    displayPrice();


}

function displayPrice() {
    let totalMRP = 0;
    let totalDiscount = 0;
    let sumMRP = 0;
    let sumDiscount = 0;

    /* Unlike map()andfilter() , forEach() always returns undefined and is not chainable. 
    
    therefore do not return anything in forEach function or do not assign function in some variable.
    
        totalMRP=bagCart.forEach(item=>{
        sum+=item.price.originalPrice;
        return sum;
    
        this is a wrong way
    })*/
    bagCart.forEach(item => {

        sumMRP += item.price.originalPrice;
        totalMRP = sumMRP;

    })

    bagCart.forEach(item => {

        sumDiscount += (item.price.originalPrice - item.price.rate);
        totalDiscount = sumDiscount;
    })


    let finalAmount = totalMRP - totalDiscount + CONVENIENCE_FEE;


    let priceElement = document.querySelector('.priceContainer');

    let newHtml = `
    
                <div class="priceHead">Price Details (${bagCart.length} items)</div>

                <div class="price-container">
                    <div class="price-box">
                        <p class="price-text">Total MRP</p>
                        <p class="price-text">Discount on MRP</p>
                        <p class="price-text">Convenience Fee</p>
                    </div>
                    <div class="price-calc">
                        <p class="amt">Rs${totalMRP}</p>
                        <p class="amt-discount">-Rs${totalDiscount}</p>
                        <p class="amt">Rs${CONVENIENCE_FEE}</p>
                    </div>
                </div>
                  <div class="hr"></div>

                <div class="total-amount">
                    <p>Total Amount</p>
                    <p>Rs ${finalAmount}</p>
                </div>

                <button class="order-btn">Place Order</button>
    `;
    priceElement.innerHTML = newHtml;
}

function removeBagItem(itemId) {
    let count = 0;
    //or btnArray=btnArray.filter(ids=>ids!=itemId);
    btnArray = btnArray.filter(ids => {
        if (itemId != ids || count >= 1) {
            return ids;
        }
        else if (count < 1) {
            count++;

        }
    }
    )
    localStorage.setItem('bagitem', JSON.stringify(btnArray));
    console.log(bagCart);
    accessObject();//access of object from its Id on page load
    displayBagitem();//function of diplay of cards on page load
    displayBagItem();
    displayPrice();

}




function displayBagitem() {

    let bagElements = document.querySelector('.cardContainer');

    let newHtml = '';
    if(bagCart!=0){
        newHtml=`
        <a class="shop-btn" href="index.html"><div class="shop shop-more">shop more</div></a>
    
        `;
    }

    bagCart.forEach(item => {
        newHtml += ` <div class="bagcard">
                    <div class="bagImg">
                        <img class="bagimage" src="${item.image}">
                    </div>

                    <div class="about-item">
                        <h class="company-bag">${item.company}</h>

                        <div>
                            <span class="about-bag">${item.about}</span>
                        </div>

                        <div class="bag-price">
                            <span class="bag-rate">RS. ${item.price.rate}</span>
                            <span class="bag-originalPrice">Rs. ${item.price.originalPrice}</span>
                            <span class="bag-discount">(${item.price.discount}%OFF)</span>
                        </div>

                        <div>
                            <span class="return-day">14 days</span>
                            <span class="return"> return available</span>
                        </div>

                        <span class="delivery-info">Delivery by</span>
                        <span class="delivery-date">10 oct 2024</span>


                    </div>

                    <p class="cancel" onclick="removeBagItem(${item.id})">X</p>

                </div>


`})

if(bagCart.length==0){
    newHtml=`
    <div class="empty-bag">
    <img src="images/emptyCart.png"  class="cart-image" alt="empty-cart-image">
    <p class="empty-cart">Your Cart Is Empty!</p>
    <a class="shop-btn" href="index.html"><div class="shop">shop</div></a>
    </div>
    `;
}

    bagElements.innerHTML = newHtml;



}

function accessObject() {
    bagCart = btnArray.map(itemId => {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id == itemId) {
                return items[i];
            }
        }
    }
    )
}
console.log(btnArray);
console.log(bagCart);

