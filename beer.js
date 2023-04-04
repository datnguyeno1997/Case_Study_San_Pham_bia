class Beer {
    constructor(id, photo, name, price) {
        this.id = id;
        this.photo = photo;
        this.name = name;
        this.price = price;
    }
}

let beers = [
    new Beer(1,"image/-202212201544483450-removebg-preview.png", "Huda Beer Lager", 14000),
    new Beer(2,"image/bq176c0b41d725bd3ce2f92e31ecf9f3-removebg-preview.png", "Huda Ice Blast", 15000),
    new Beer(3,"image/bia-huda-gold-lon-330ml-202011121027132946-removebg-preview.png", "Huda Gold", 15000),
    new Beer(4,"image/1669091518-Huda-Core-chai-330ml-removebg-preview.png", "Huda Beer", 12000),
    new Beer(5,"image/huda-ice-bottle-removebg-preview.png", "Huda Ice", 12000),
    new Beer(6,"image/d0b011532e89c138fe9c2ae33a09ef6d-removebg-preview.png", "Huda", 10000),
    new Beer(7,"image/tải_xuống-removebg-preview.png", "Huda Lager", 330000),
    new Beer(8,"image/e084e9aee7b771715d5bfb683216d447-removebg-preview.png", "Huda Gold", 350000),
    new Beer(9,"image/9f38ebdc27e917ec4060d54233d688fe-removebg-preview.png", "Huda Ice", 350000),
    new Beer(10,"image/thung-24-lon-bia-larue-special-330ml-202103162306028163-removebg-preview.png", "Larue", 280000),
    new Beer(11,"image/thung-24-lon-bia-tiger-330ml-202003251459214737-removebg-preview.png", "Tiger", 300000),
    new Beer(12,"image/thung-24-lon-bia-tiger-crystal-330ml-202210281228326714-removebg-preview.png", "Tiger Crystal", 410000)
]

let cart = [];

let totalMoney = 0;

function renderBeer() {
    let row = document.querySelector('.row');
    for (let beer of beers) {
        row.innerHTML +=
            `
        <section class="product-items">
            <div class="product-item">
                <img class="photo"
                    src="${beer.photo}" alt="">
                    <div class="quick-view">
                            Sale 5%
                    </div>
                    <button class="quick-buy" onclick="addToCart(${beer.id})">Buy</button>
            </div>
            <div class="size">    
                <h1 class="beer-name">${beer.name}</h1>
                <p class="price">${formatCurrency(beer.price)}</p>
            </div>
        </section>
        `
    }
}
function formatCurrency(number) {
    return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

renderBeer();

const btn = document.querySelectorAll(".quick-buy")

function addToCart(id) {
    let beer = beers.find(item => item.id == id);

    if (beer) {
        if (cart.length === 0) {
            beer.quantity = 1;
            beer.totalAmount = beer.price;
            cart.push(beer);
        }
        else {
            let beerIndex = cart.findIndex(item => item.id == id);

            console.log(beerIndex);
    
            if (beerIndex > -1) {
                cart[beerIndex].quantity += 1;
                cart[beerIndex].totalAmount = cart[beerIndex].quantity * cart[beerIndex].price;
            }
            else {
                beer.quantity = 1;
                beer.totalAmount = beer.price;
                cart.push(beer);
            }
        }
    }

    renderCart();
}

function renderCart() {
    let cartTable = document.querySelector("tbody");
    cartTable.innerHTML = '';
    totalMoney = 0;

    cart.forEach(item => {
        let trcontent = `
            <tr>
                <td style="display: flex;align-items: center;">
                <img class="photos" src=" ${item.photo} " alt="">
                <span class="tittle"> ${item.name} </span>
                </td>
                <td>
                <p> ${item.price}</p>
                </td>
                <td>
                <input class="quantity" style="width: 30px; height: 30px; outline: none; text-align: center;" type="number" data-id="${item.id}" value="${item.quantity}" min="1">
                </td>
                <td>${item.totalAmount}</td>
                <td style="cursor: pointer;"><span class="cart-delete" data-id="${item.id}">Xóa</span</td>
            </tr>
        `;

        cartTable.innerHTML += trcontent
        
        totalMoney += item.totalAmount;
    });

    inputchange();

    deleteCart()

    document.getElementById('totalMoney').innerHTML = formatCurrency(totalMoney);
}


function addcart(productPrice, productImg, productName, i) {
    let addtr = document.createElement("tr");
    for (let j = 0; j < cart.length; j++) {
        if (beers[i].id == cart[j].id) {
            alert("Sản phẩm của bạn đã có trong giỏ hàng")
            return;
        }
    }
    let trcontent = `
        <tr>
            <td style="display: flex;align-items: center;">
            <img class="photo" src=" ${productImg} " alt="">
            <span class="tittle"> ${productName} </span>
            </td>
            <td>
            <p> ${productPrice}</p>
            </td>
            <td>
            <input style="width: 30px; outline: none; text-align: center;" type="number" value="1" min="1">
            </td>
            <td style="cursor: pointer;"><span class="cart-delete">Xóa</span</td>
        </tr>
    `;

    addtr.innerHTML = trcontent
    let cartTable = document.querySelector("tbody")
    cartTable.append(addtr)
    cart.push(beers[i]);
    deleteCart()
    productPrice = beers[i].price
    totalMoney += productPrice;
    document.getElementById('totalMoney').innerHTML = formatCurrency(totalMoney);
}    

function deleteCart() {

    let elem = document.querySelectorAll('.cart-delete');

    elem.forEach(item => {
        item.addEventListener('click', function(e){
            let itemId = this.dataset.id;

            let cartItemIndex = cart.findIndex(item => item.id == itemId);
            cart.splice(cartItemIndex, 1);

            renderCart();
        } )
    })
}

function inputchange() {

    let elem = document.querySelectorAll('.quantity');

    elem.forEach(item => {
        item.addEventListener('change', function(e){
            let currentQuantity = e.target.value;
            let itemId = this.dataset.id;
            
            let beer = beers.find(item => item.id == itemId);
            let beerPrice = beer.price;
            let newTotalAmount = currentQuantity * beerPrice;

            let cartItemIndex = cart.findIndex(item => item.id == itemId);
            cart[cartItemIndex].quantity = currentQuantity;
            cart[cartItemIndex].totalAmount = newTotalAmount;

            renderCart();
        } )
    })
}

function sum(){
    document.getElementsByClassName("cart")[0].style.display="block"
}
function mis(){
    document.getElementsByClassName("cart")[0].style.display="none"
}
