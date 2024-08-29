console.log("=== Connected to Shopping List ===")

// Selecting DOM Elements
const itemInputEl = document.getElementById("item");                                // Input item
const quantityInputEl = document.getElementById("quantity");                        // Input Qty
const shoppingListDisplayEl = document.getElementById("shopping-list-display");      // <p> tag to render list



//shoppingList is an array [] of objects {item, quantity}.//
const shoppingList = [];


// ==========================//
//       addItem Function
// ==========================//
function addItem(event) {
    // Prevent the default behaviour of our button (refresh the page)
    event.preventDefault();

    //create an obj and add it to the shoppingList array.
    const itemToAdd = {
        item: itemInputEl.value,
        quantity: quantityInputEl.value
    }
    console.log("item to add", itemToAdd);

    // Add the new object to the shoppingList array:
    shoppingList.push(itemToAdd);
    console.log("Shopping List Array", shoppingList)

    // Clear up the input fields
    itemInputEl.value ="";
    quantityInputEl.value ="";

    // Call the function that will re-render the array with the new updates.
    displayListItems();
}


// ==========================//
//  displayListItems Function
// ==========================//
function displayListItems() {
    // clear the display
    shoppingListDisplayEl.innerHTML = "";

    for (let i = 0; i < shoppingList.length; i++) {
        shoppingListDisplayEl.innerHTML += `<p class="shopping-item">${shoppingList[i].item} x ${shoppingList[i].quantity}
        <span onclick="deleteItem(${i})">&#10062</span>
        </p>`
    }
}


// ==========================//
//     deleteItem Function
// ==========================//
function deleteItem(itemToDelete) {
    console.log("Index of item to be deleted: ", itemToDelete);

    // Delete the item using splice method
    // This will use the index of the deleted passed in as an argument when function is called
    // It will delete one element from that index (therefore the element itself)

    shoppingList.splice(itemToDelete, 1);       
    //itemToDelete is being called as "i" on line 50 - showing the index -> 1 is the number of elements that will be deleted starting at index "i".

    
    // Call the function to re-render the array onto the page with updates.
    displayListItems();

}

// ============================//
//    Shopping Basket Logic
//=============================//

// Selecting elements.
const shoppingBasketInputEl = document.getElementById("shopping-basket");   // Shopping basket input text
const itemsStillToDisplayEl = document.getElementById("items-still-to-buy-display");    // List to be displayed

// ============================//
//    addToBasket function
//=============================//

function addToBasket(event) {
    //prevent page from refreshing on submitting "button"
    event.preventDefault();

    // Split the string and 
    const basketArray = shoppingBasketInputEl.value.toLowerCase().split(/,\s*/);
    console.log("Display basketArray", basketArray);

    //Filter returns a new array of elements that passed a condition or test
    // in this example, it will the elements that aren't in the basket:

    const itemsStillToBuy = shoppingList.filter(function(groceryItem) {
        return !basketArray.includes(groceryItem.item.toLowerCase());
    });

    console.log("Items still to buy", itemsStillToBuy)
    
    //Display itemsStillToBuy Array Element

    // Clearing the old list before displaying the list from current array:
    itemsStillToDisplayEl.innerHTML = "<p> Here are the items you still need to get. </p>";
    
    // conditional to check if anything else is required to be bought or done shopping:
    
    if (itemsStillToBuy.length === 0) {
        itemsStillToDisplayEl.innerHTML = "<p> You've bought everything you needed. </p>";
    }


    // loop to generate updated itemsStillToBuy list

    itemsStillToBuy.forEach(function (groceryItem) {
        itemsStillToDisplayEl.innerHTML += `<p class="shopping-item">${groceryItem.item} x ${groceryItem.quantity}</p>`;
    })
}