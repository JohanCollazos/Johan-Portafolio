//1. cambiaremos el color del car y addToCart button cuando el color es seleccionado 
//- seleccionamos los elementos 
const redcolor = document.querySelector(".red");
const blackcolor = document.querySelector(".black");
const imagecard = document.querySelector(".product-image");
const feedbackBtn = document.querySelector(".feedback");
const graycolor = document.getElementsByClassName("gray");
const cartbutton = document.getElementById("button");
const itemtag = document.getElementsByTagName("h3")[0];

//Modificando elementos 
//- Add event listeners 
//- Red color 
redcolor.addEventListener("click", function () {
    cartbutton.style.background = "red";
    itemtag.style.backgroundColor = "red";
    imagecard.style.backgroundImage = 'url("https://i.postimg.cc/cH2pJdny/red-benz.webp")';
});

graycolor[0].addEventListener("click", function () {
    cartbutton.style.background = "gray";
    itemtag.style.backgroundColor = "gray";
    imagecard.style.backgroundImage = 'url("https://i.postimg.cc/BvyYTMQ2/gray-benz.jpg")';
});

blackcolor.addEventListener("click", function () {
    cartbutton.style.background = "black";
    itemtag.style.backgroundColor = "black";
    imagecard.style.backgroundImage = 'url("https://i.postimg.cc/NGRJX8hr/black-benz.jpg")';
});

//- cart button 
const cart = () => {
    cartbutton.style.display = "none";
    feedbackBtn.style.display = "block";
};
cartbutton.addEventListener("click", cart);

//-feedback button 
const feedback = () => {
    cartbutton.style.display = "block";
    feedbackBtn.style.display = "none";
};
feedbackBtn.addEventListener("click", feedback);
