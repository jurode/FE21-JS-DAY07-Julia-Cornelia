
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
    
    
    console.log(itemTitle, itemPrice);



}