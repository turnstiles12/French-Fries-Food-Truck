const express=require("express");
const nodemailer=require("nodemailer");
const cors=require("cors");
const bodyparser=require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'orderStyle.css')));
app.use(express.static(path.join(__dirname, 'FrenchFriesStyle.css')));

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, 'Home.html'));
});
app.get("/order", (req, res) => {
    res.sendFile(path.join(__dirname, 'Order.html'));
});
app.get("/aboutus", (req, res) => {
    res.sendFile(path.join(__dirname, 'AboutUs.html'));
});

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




//ripple effect on "place order" buttons

const buttons = document.querySelectorAll('.menu-item button');
buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const x = e.clientX;
        const y = e.clientY;

        const buttonTop = e.target.offsetTop;
        const buttonLeft = e.target.offsetLeft;

        const xInside = x - buttonLeft;
        const yInside = y - buttonTop;

        const circle = document.createElement('span');
        circle.classList.add('circle');
        circle.style.top = yInside + 'px';
        circle.style.left = xInside + 'px';

        this.appendChild(circle);

        circle.addEventListener('animationend', () => {
            circle.remove();
        });
    });
});
const jokeEl = document.getElementById('joke')
const jokeBtn = document.getElementById('insert-joke')

jokeBtn.addEventListener('click', generateJoke)

generateJoke()

// USING ASYNC/AWAIT
async function generateJoke() {
  const config = {
    headers: {
      Accept: 'application/json',
    },
  }

  const res = await fetch('https://icanhazdadjoke.com', config)

  const data = await res.json()

  jokeEl.innerHTML = data.joke
}
