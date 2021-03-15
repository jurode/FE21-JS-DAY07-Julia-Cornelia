
// add to cart buttons - addEventListener
let addToCartButtonArray = document.getElementsByClassName("addToCartButton");
for (let i = 0; i < addToCartButtonArray.length; i++){
    // declare each button as a variable
    let addToCartButton = addToCartButtonArray[i];
    // for this button add Event Listener
    addToCartButton.addEventListener("click", addItem);
}



function addItem(e){
    console.log("call function addItem");

    // save the button's parent parent as variable (=div container)
    let item = e.target.parentElement.parentElement;

    // now take for each button the title etc.:
    // don't take "getElementsByClassName" here
    let itemTitle = item.querySelector(".card-title").innerText; 
    let itemPrice = item.querySelector('.card-price').innerText.replace("€", "");
    let itemPicture = item.querySelector(".card-img-top").src;
    rowCreate(itemTitle, itemPrice, itemPicture);
    
    console.log(itemTitle, itemPrice, itemPicture);
}

function rowCreate(itemTitle, itemPrice, itemPicture){
    // create variables for use of for-loop that +1 in the shopping cart
    let cartItems = document.getElementById('cart-items');
    let cartItemsNames = cartItems.getElementsByClassName('cart-item-title');
    let cartItemQtt = cartItems.getElementsByClassName('cart-quantity');

    // this loop adds +1 to an item already in the cart instead of adding the item again
    for (let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == itemTitle) {
            alert("This item already exists in your cart");
            let qtt = Number(cartItemQtt[i].innerHTML);
            cartItemQtt[i].innerHTML = qtt + 1 ;
           // console.log(qtt);
            updateTotal();        
            return ;//it will stop our script
        }
}

    let item = `
    <div class="cart-row row d-flex ">
        <div class="cart-item col-6 my-3 ">
            <img class="cart-item-image" src="${itemPicture}" width="100" height="100">
            <span class="cart-item-title h5 ">${itemTitle}</span>
        </div>

        <span class="cart-price col-3 h4 my-3">€ ${itemPrice}</span>

        <div class="cart-qtty-action col-3 d-flex">           
            <i class="minus fa fa-minus-circle my-auto" ></i>            
            <div class="cart-quantity p-4 h4">1</div>            
            <i class="plus fa fa-plus-circle my-auto"></i>        
            <button class="del btn btn-danger rounded-circle  my-auto ms-3 fw-bold" type="button"> X </button>            
        </div>
    </div>`;
    let cart = document.getElementById('cart-items');
    cart.innerHTML += item;
    // documentReady();
    console.log(item);
}

// adding the prices of the items in the shopping cart and updating the total price
function updateTotal() {
    let cart = document.getElementById("cart-items");
    let cartRows = cart.getElementsByClassName("cart-row");
    let total = 0; // it will be calculated from zero each time it is updated
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let price = parseFloat(cartRow.getElementsByClassName( "cart-price")[0].innerText.replace("€", ""));

 //we only need the first one
        let qtt = Number(cartRow.getElementsByClassName("cart-quantity")[0].innerText);
        console.log(price, qtt);
        total += (price * qtt);
        console.log(total);
    }
    total = total.toFixed(2);//toFixed() will help rounding the number to 2 decimals
    let totalElement = document.getElementById("total-price").querySelector( '#total-price-sum');
    // console.log(total);
    totalElement.innerHTML = "€" + total;
};