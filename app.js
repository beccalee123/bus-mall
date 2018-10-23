'use strict';

//resources: specs, images.
//should update images to the same file format
//may make sense to update image names to left, center, and right.
//If we put the images into a container, then we can use just one event listener ON THE CONTAINER (this kind of blew my mind)


//++++++++++++++++++++++++++++++
// SETTING UP GLOBAL DATA
//++++++++++++++++++++++++++++++

//these set us up to be able to concatenate the file name rather than typing it out.
var names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

var allProducts = []; // This is the main array of objects
var totalClicks = 0; // Tallies the 25 clicks

// DOM access
var container = document.getElementById('image_container');
var left = document.getElementById('left');
var center = document.getElementById('center');
var right = document.getElementById('right');
var productList = document.getElementById('productList');
var justViewed = [];

//++++++++++++++++++++++++++++++
// CONSTRUCTOR
//++++++++++++++++++++++++++++++

function Product(name) {
  this.name = name; // this will be the alt title value
  this.filepath = `img/${name}.jpg`; // this creates the file path
  this.views = 0;
  this.votes = 0;
  allProducts.push(this);
}

//++++++++++++++++++++++++++++++
// INSTANCES
//++++++++++++++++++++++++++++++

for (var i = 0; i < names.length; i++) {
  new Product(names[i]);
}

//++++++++++++++++++++++++++++++
// FUNCTION DECLARATIONS
//++++++++++++++++++++++++++++++

//make a general random number
function makeRandom() {
  return Math.floor(Math.random() * allProducts.length);
}

//it can be helpful to work on specific code problems outside of your codebase so you don't get too drawn in to the other work you've done.
//make an array of three unique numbers
function makeThreeUnique() {
  console.log(justViewed, 'just viewed in line 59');
  var output = [];
  // makes first element
  var firstNum = makeRandom();
  // handles duplicates from last set of 3
  while (justViewed.includes(firstNum)) {
    firstNum = makeRandom(); // makes first again
  }
  // pushes to first num
  output.push(firstNum);

  // need to generate second element
  var secondNum = makeRandom();
  // if it matches 1st, 
  while (output[0] === secondNum|| justViewed.includes(secondNum)){
    console.log('duplicate detected on second');
    // reroll
    secondNum = makeRandom();
  }
  output.push(secondNum);

  // generate 3rd number
  var thirdNum = makeRandom();
  // if it matches... 
  while (output[0] === thirdNum || output[1] === thirdNum || justViewed.includes(thirdNum)){
    console.log('duplicate detected on third');
    // reroll
    thirdNum = makeRandom();
  }
  output.push(thirdNum);
  
  justViewed = output;
  return output;
}

function displayPics() {
  var idx = makeThreeUnique();
  console.log(idx, 'three new indeces in line ');
  //set up view count
  allProducts[idx[0]].views++;
  allProducts[idx[1]].views++;
  allProducts[idx[2]].views++;
  //set up dom generation
  left.src = allProducts[idx[0]].filepath;
  center.src = allProducts[idx[1]].filepath;
  right.src = allProducts[idx[2]].filepath;
  left.alt = allProducts[idx[0]].name;
  center.alt = allProducts[idx[1]].name;
  right.alt = allProducts[idx[2]].name;
  left.title = allProducts[idx[0]].name;
  center.title = allProducts[idx[1]].name;
  right.title = allProducts[idx[2]].name;
}

function handleClick(event) {
  // console.log(event.target.alt, 'was clicked');
  if (event.target.id === 'image_container') {
    return alert('Please click directly on an image');
  }
  totalClicks++;
  // console.log(totalClicks, 'total clicks');
  //for loop to iterate over the array of all products
  for (var i = 0; i < allProducts.length; i++){
    if (event.target.alt === allProducts[i].name){
      allProducts[i].votes++;
    }
  }
  //handle total number of votes allowed
  if (totalClicks === 25) {
    container.removeEventListener('click', handleClick);
    return showList(); //this return statement will kick us out of the loop
  }
  displayPics();
}

function showList() {
  for (var i = 0; i < allProducts.length; i++){
    var liEl = document.createElement('li');
    liEl.textContent = `${allProducts[i].name} has ${allProducts[i].views} views and ${allProducts[i].votes} votes`;
    productList.appendChild(liEl);

  }
}

//++++++++++++++++++++++++++++++
// CODE THAT EXECUTES ON PAGE LOAD
//++++++++++++++++++++++++++++++
displayPics();
container.addEventListener('click', handleClick);




// 'use strict';

// // Array to store the items
// var allBusMallItems = [];

// //Array for displayed pictures
// var itemsDisplayedLast = [];

// // Make a constructor function
// function BusMallItem(name, filepath){
//   this.name = name;
//   this.filepath = filepath;
//   this.votes = 0;
//   this.views = 0;
//   allBusMallItems.push(this);
// }

// // Make new item instances
// new BusMallItem('R2D2 Bag', 'img/bag.jpg');
// new BusMallItem('Banana Slicer', 'img/banana.jpg');
// new BusMallItem('iPad Bathroom Stand', 'img/bathroom.jpg');
// new BusMallItem('Open-Toed Rainboots', 'img/boots.jpg');
// new BusMallItem('Full Breakfast Appliance', 'img/breakfast.jpg');
// new BusMallItem('Meatball Bubblegum', 'img/bubblegum.jpg');
// new BusMallItem('Extremely Comfortable Chair', 'img/chair.jpg');
// new BusMallItem('Cthulhu Figurine', 'img/cthulhu.jpg');
// new BusMallItem('Duck Bill Dog Muzzle', 'img/dog-duck.jpg');
// new BusMallItem('Dragon Meat', 'img/dragon.jpg');
// new BusMallItem('Pen Utensils', 'img/pen.jpg');
// new BusMallItem('Pet Sweep', 'img/pet-sweep.jpg');
// new BusMallItem('Pizza Scissors', 'img/scissors.jpg');
// new BusMallItem('Shark Sleeping Bag', 'img/shark.jpg');
// new BusMallItem('Sweeping Onesie for Babies', 'img/sweep.png');
// new BusMallItem('Tauntaun Sleeping Bag', 'img/tauntaun.jpg');
// new BusMallItem('Unicorn Meat', 'img/unicorn.jpg');
// new BusMallItem('Tentacle USB Drive', 'img/usb.gif');
// new BusMallItem('Extremely Helpful Watering Can', 'img/water-can.jpg');
// new BusMallItem('Extremely Easy to Drink From Wine Glass', 'img/wine-glass.jpg');


// // Get the <img> element from the DOM
// var itemImage1 = document.getElementById('busmall-item-1');
// var itemImage2 = document.getElementById('busmall-item-2');
// var itemImage3 = document.getElementById('busmall-item-3');

// //Refactor

// function randomItem(item) {
//   // Select a random item from the array
//   var idx = Math.floor(Math.random() * allBusMallItems.length);
//   console.log(allBusMallItems[idx]);
//   // Assign the src, alt, and title attributes to the <img> element
//   item.src = allBusMallItems[idx].filepath;
//   item.alt = allBusMallItems[idx].name;
//   item.title = allBusMallItems[idx].name;
//   // Console log which item is showing
//   console.log(`${allBusMallItems[idx].name} is showing`);
// }

// randomItem(itemImage1);
// randomItem(itemImage2);
// randomItem(itemImage3);

// function handleClick(event) {
//   console.log(event.target);
//   randomItem(itemImage1);
//   randomItem(itemImage2);
//   randomItem(itemImage3);
// }

// // Listen for clicks on the images and then display a new set of images
// itemImage1.addEventListener('click', handleClick);
// itemImage2.addEventListener('click', handleClick);
// itemImage3.addEventListener('click', handleClick);

// //push current display to an array (itemsDisplayedLast)
// //create while loop to handle if item was in last spread of 3 images
// //

// //while loop to handle if item was in last spread of 3 images
//   // while(itemsDisplayedLast.includes(idx)) {
//   //   idx = Math.floor(Math.random() * allBusMallItems.length);
//   //   console.log('Found duplicate');
//   // }

//   // itemsDisplayedLast.push(idx);


// //create an array for the selected images (itemDisplayedLast). This holds the info of the last images put on the screen. Before putting a new one on the screen check if the image has already been used.

// //create if/else statement to handle whether or not an image was just shown.

// //create variable for last displayed, or something similar
// //could use the .includes method.