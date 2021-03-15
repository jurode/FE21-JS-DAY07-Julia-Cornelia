// set quantity stock
let quantityStock = [
    ["Bouqet 1", 5],
    ["Bouqet 2", 2],
    ["Bouqet 3", 1],
    ["Bouqet 4", 3],
    ["Bouqet 5", 4],   
]


function documentReady(){
    // add to cart buttons - addEventListener
    let addToCartButtonArray = document.getElementsByClassName("addToCartButton");
    for (let i = 0; i < addToCartButtonArray.length; i++){
        // declare each button as a variable
        let addToCartButton = addToCartButtonArray[i];
        // for this button add Event Listener
        addToCartButton.addEventListener("click", addItem);
    }

    let plusBtns = document.getElementsByClassName('plus');
    for (let i = 0; i < plusBtns.length; i++) {
        let plusBtn = plusBtns[i];
        plusBtn.addEventListener("click", plusQtt);
    }

    let minusBtns = document.getElementsByClassName('minus');
    for (let i = 0; i < minusBtns.length; i++) {
        let minusBtn = minusBtns[i];
        minusBtn.addEventListener("click", minusQtt);
    }

    let delItemBtns = document.getElementsByClassName('del');
    for (let i = 0; i < delItemBtns.length; i++) {
       let delBtn = delItemBtns[i];
       delBtn.addEventListener("click", delItem);
    }
}
documentReady();


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
    updateTotal();
    updateQtt();
    // console.log(itemTitle, itemPrice, itemPicture);
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
            updateQtt();      
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
    documentReady();
    // console.log(item);
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
    if (total >= 100){
        total = total * 0.9;
        let discount = document.getElementById("discount");
        discount.innerHTML = "-10% discount";
    } else if (total < 100){
        let discount = document.getElementById("discount");
        discount.innerHTML = "";
    }
    totalElement.innerHTML = "€" + total;
};

function plusQtt(e) {
    let itemPlus = e.target.parentElement; // take the <div> above
    let qtt = Number(itemPlus.querySelector('.cart-quantity').innerHTML); // from the <div> now take the quantity
    itemPlus.querySelector('.cart-quantity').innerHTML = qtt + 1;
    // console.log(qtt);
   
    // check Quantity in stock
    let cartItemTitle = e.target.parentElement.parentElement.querySelector(".cart-item-title").innerText;  // title of current cart row

    let qttCurrentArray = document.getElementById("shopItems").querySelectorAll(".stockQttSum"); // create array of all stock quantities

    //  ? not properly working yet
    // for all my qttCurrentArray Elements...
    // for (let i = 0; i < cartItemTitle.length; i++){
    //     if (cartItemTitle === quantityStock[i]) {
    //         if (qtt > qttCurrentArray[i]){
    //             alert("we don't have so many items in stock");
    //         } else if (qtt <= qttCurrentArray[i]) {
    //             updateTotal();
    //             updateQtt();
    //         }
    //     }
    // }
updateTotal();
updateQtt();
}

function minusQtt(e) {
    let itemMinus = e.target.parentElement.parentElement;
    let qtt = Number(itemMinus.querySelector('.cart-quantity').innerHTML);
    if (qtt == 1) {
       console.log("There shouldn't be 0 products in the cart");
       delItem(e);
    } else {
       itemMinus.querySelector('.cart-quantity').innerHTML = qtt - 1;
       console.log(qtt);
       updateTotal();
       updateQtt();
    }
}
 
function delItem(e) {
    let delBtnAction = e.target.parentElement.parentElement.remove();  
    updateTotal();
    updateQtt();
}

// adding the quantity of the items in the shopping cart and updating the total qtt
function updateQtt() {
    let cart = document.getElementById("cart-items");
    let cartRows = cart.getElementsByClassName("cart-row");
    let total = 0; // it will be calculated from zero each time it is updated
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        //we only need the first one
        let qtt = Number(cartRow.getElementsByClassName("cart-quantity")[0].innerText);
        total += qtt;
    }
    total = total.toFixed(0);//toFixed() will help rounding the number to 2 decimals
    let totalElement = document.getElementById("total-qtt").querySelector('#total-qtt-sum');
    // console.log(total);
    totalElement.innerHTML = total;
};