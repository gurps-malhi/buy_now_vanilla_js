const products = [
    {
        id: 0,
        product : "Mangoes",
        price : 0.50,
        description: "A mango is a juicy stone fruit (drupe) produced from numerous species of tropical trees belonging to the flowering plant genus Mangifera,cultivated mostly for their editble fruit.",
        img: "./img/mangoes.png",
        countryOfOrigin: "India",
        alt_tag: "picture of Mangoes" 
    },
    {
        id: 1,
        product : "Strawberries",
        price : 0.20,
        description: "This fruit is widely appreicated for its characteristic aroma, bright red color, juicy texture, and sweetness. It is consumed in large quanties and popular in jame and ice cream",
        img: "./img/strawberries.png",
        countryOfOrigin: "Spain",
        alt_tag: "picture of Strawberries" 
    },
    {
        id: 2,
        product : "Guavas",
        price : 0.40,
        description: "Guavas are a common tropical fruit cultivated in many tropical and subtropical regions, originated from an area thought to extend from Mnexico or Central America",
        img: "./img/guavas.png",
        countryOfOrigin: "Guatemala",
        alt_tag: "picture of Guavas" 
    },
]



const product_container = document.getElementById("product_container");
let load_modal = false;
let prod_name_modal = document.getElementById("prod_name_modal");
let prod_country_modal = document.getElementById("prod_country_modal");
let prod_img_modal = document.getElementById("prod_img_modal");
let prod_desc_modal = document.getElementById("prod_desc_modal");
let prod_price_modal = document.getElementsByClassName("prod_price_modal");


const captured_modal = document.getElementById("product-modal");
const buy_now = document.getElementById("buy-now");

//to be populated when buying
let empty_prod = {
    id: 0,
    product : "",
    price : 0,
    description: "",
    img: "",
    countryOfOrigin: "",
    alt_tag: "" 
}

for(let i = 0; i < products.length; i++){
    build_product_card (products[i].id,products[i].product,products[i].price, products[i].description, products[i].img, products[i].countryOfOrigin,products[i].alt_tag);
}

//Initialise all dynamically generated content here
const prod_container = document.querySelectorAll('.prod-outer-container');
const remove_modal = document.getElementById("remove-modal");



for(let i= 0; i < prod_container.length; i++){
    prod_container[i].addEventListener("click", () =>{
    let data_id = prod_container[i].getAttribute("data-id");
    getproduct(data_id);
    showModal(true);   
   });
}


function getproduct(id){
    for(let i = 0; i < products.length; i++){
        if(id == products[i].id){
            //populate the modal
            prod_name_modal.childNodes[0].nodeValue = products[i].product;
            prod_country_modal.textContent  = " from " +  products[i].countryOfOrigin;
            prod_img_modal.src  = products[i].img;
            prod_img_modal.alt  = products[i].alt_tag;
            prod_desc_modal.innerText =  products[i].description;
            prod_price_modal[0].innerHTML = "\u00A3" +products[i].price.toFixed(2) + " each" ;
            prod_price_modal[1].innerHTML = "\u00A3" +products[i].price.toFixed(2);

            //populates an empty product template to do with as needed i.e. pass to "add to cart page".
            empty_prod.id = products[i].id,
            empty_prod.product = products[i].product,
            empty_prod.price = products[i].price.toFixed(2),
            empty_prod.description = products[i].description,
            empty_prod.img = products[i].img,
            empty_prod.countryOfOrigin = products[i].countryOfOrigin,
            empty_prod.alt_tag = products[i].alt_tag
        }
    }
}
//created the products cards
function build_product_card (prod_id,prod_name,prod_price, prod_desc, prod_img, prod_country_of_origin,prod_alt_tag){
    const d_flex = nameClassedDiv("div","d-flex prod-outer-container");
    d_flex.setAttribute('data-id', prod_id);
    
    const parent_col = nameClassedDiv("div","col-11 col-sm-12 col-lg-12 mx-auto p-4");
    const prod_inner_container = nameClassedDiv("div","product-inner-container d-flex m-4 bg-white");

    const img_container = nameClassedDiv("div","col-6 col-sm-5 col-md-3 col-lg-2 fruit-img-container");
    const img = nameClassedDiv("img","flex-img-fruit")
    img.src = prod_img;
    img.alt = prod_alt_tag;

    const info_container = nameClassedDiv("div","col-12 col-md-9 align-center-self Gotham-Light text-mute mx-auto");
    const h2 = nameClassedDiv("h2","Gotham-Medium text-black header-styling header-styling--indent");
    h2.innerText = prod_name;
    const span = nameClassedDiv("span","Gotham-Light text-mute");
    span.innerText = " from " + prod_country_of_origin;
    const p = nameClassedDiv("p","p-styling-product");
    p.innerText = prod_desc;

    const price_container = nameClassedDiv("div","price-flag price-flag--green");
    const span2 = nameClassedDiv("span","text-white Gotham-Medium");
    const price = prod_price.toFixed(2);
    span2.innerText = "\u00A3"+price + " each";

    img_container.appendChild(img);
    prod_inner_container.appendChild(img_container);
    
    price_container.appendChild(span2);
    prod_inner_container.appendChild(price_container);

    info_container.appendChild(h2);
    info_container.appendChild(p);
    h2.appendChild(span);
  
    prod_inner_container.appendChild(info_container);
    
    parent_col.appendChild(prod_inner_container);
    d_flex.appendChild(parent_col);

    product_container.appendChild(d_flex);
}

//created the empty elements and associated classes
function nameClassedDiv (createdElement, appendClassName) {
    const new_div = document.createElement(createdElement);
     new_div.className = appendClassName;
     return new_div;
};


// When the user clicks x close modal.
remove_modal.addEventListener("click", (e)=>{
    showModal(false); 
});
//when the user clicks buy now button
buy_now.addEventListener("click", (e) =>{
    showModal(false);
    console.log(empty_prod);
})

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == captured_modal) {
        showModal(false);
    }
}


//controls modal's visability
function showModal(bool){
    if(bool){
        captured_modal.style.display = "block";
    }else{
        captured_modal.style.display = "none";     
    }
}







