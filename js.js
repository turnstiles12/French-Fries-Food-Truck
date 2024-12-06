let orders = [];
let total = 0;

function addToOrder(name, price) {
    orders.push({name: name, price: price});

    updateOrderSummary();
}

function updateOrderSummary() {
    const orderList = document.getElementById('order-list');
    const totalPrice = document.getElementById('total-price');

    orderList.innerHTML = '';  //clear list
    total = 0;  //resetting total price

    orders.forEach((item, index) => {        //fill in order list

        const listItem = document.createElement('li');

        listItem.innerHTML = `<li>${item.name} - $${item.price}</li>  
        <button id="remove-order" onclick="removeItem(${index})">Remove</button>`;       //creating list item

        orderList.appendChild(listItem);    //adding each order list item


        total += item.price;  //updating price
    });

    totalPrice.innerText = `Total: $${total}`;
}

function removeItem(index) {
    orders.splice(index, 1);

    updateOrderSummary();
}
