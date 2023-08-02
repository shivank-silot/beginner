let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Shirt',
        image: 'dress_shirt.png',
        price: 1200
    },
    {
        id: 2,
        name: 'Jeans',
        image: 'dress_jeans.png',
        price: 1800
    },
    {
        id: 3,
        name: 'Kurta',
        image: 'dress_kurta.png',
        price: 1500
    },
    {
        id: 4,
        name: 'Shoes',
        image: 'dress_shoes.png',
        price: 2000
    },
    {
        id: 5,
        name: 'Trouser',
        image: 'dress_trousers.png',
        price: 1000
    },
    {
        id: 6,
        name: 'Watch',
        image: 'gadget_watch.png',
        price: 2200
    },
    {
        id: 7,
        name: 'Jackets',
        image: 'dress_jackets.png',
        price: 2500
    },
    {
        id: 8,
        name: 'IPhone 14 Pro Max',
        image: 'mobile_iphone.png',
        price: 139900
    },
    {
        id: 9,
        name: 'Mac laptop',
        image: 'laptop_mac.png',
        price: 134900
    },
    {
        id: 10,
        name: 'Apple Airpods',
        image: 'gadget_airpods.png',
        price: 19900
    }


];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCart(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCart(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCart();
}
function reloadCart(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCart();
}
