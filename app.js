'use strict';

// Array to store the items
var allBusMallItems = [];

// Make a constructor function
function BusMallItem(name, filepath){
  this.name = name;
  this.filepath = filepath;
  this.votes = 0;
  this.views = 0;
  allBusMallItems.push(this);
}

// Make new item instances
new BusMallItem('R2D2 Bag', 'img/bag.jpg');
new BusMallItem('Banana Slicer', 'img/banana.jpg');
new BusMallItem('iPad Bathroom Stand', 'img/bathroom.jpg');
new BusMallItem('Open-Toed Rainboots', 'img/boots.jpg');
new BusMallItem('Full Breakfast Appliance', 'img/breakfast.jpg');
new BusMallItem('Meatball Bubblegum', 'img/bubblegum.jpg');
new BusMallItem('Extremely Comfortable Chair', 'img/chair.jpg');
new BusMallItem('Cthulhu Figurine', 'img/cthulhu.jpg');
new BusMallItem('Duck Bill Dog Muzzle', 'img/dog-duck.jpg');
new BusMallItem('Dragon Meat', 'img/dragon.jpg');
new BusMallItem('Pen Utensils', 'img/pen.jpg');
new BusMallItem('Pet Sweep', 'img/pet-sweep.jpg');
new BusMallItem('Pizza Scissors', 'img/scissors.jpg');
new BusMallItem('Shark Sleeping Bag', 'img/shark.jpg');
new BusMallItem('Sweeping Onesie for Babies', 'img/sweep.png');
new BusMallItem('Tauntaun Sleeping Bag', 'img/tauntaun.jpg');
new BusMallItem('Unicorn Meat', 'img/unicorn.jpg');
new BusMallItem('Tentacle USB Drive', 'img/usb.gif');
new BusMallItem('Extremely Helpful Watering Can', 'img/water-can.jpg');
new BusMallItem('Extremely Easy to Drink From Wine Glass', 'img/wine-glass.jpg');


// Get the <img> element from the DOM
var itemImage1 = document.getElementById('busmall-item-1');
var itemImage2 = document.getElementById('busmall-item-2');
var itemImage3 = document.getElementById('busmall-item-3');

//Refactor

function randomItem(item) {
  // Select a random item from the array
  var idx = Math.floor(Math.random() * allBusMallItems.length);
  console.log(allBusMallItems[idx]);
  // Assign the src, alt, and title attributes to the <img> element
  item.src = allBusMallItems[idx].filepath;
  item.alt = allBusMallItems[idx].name;
  item.title = allBusMallItems[idx].name;
  // Console log which item is showing
  console.log(`${allBusMallItems[idx].name} is showing`);
}

randomItem(itemImage1);
randomItem(itemImage2);
randomItem(itemImage3);

//create an array for the selected images. This holds the info of the last images put on the screen. Before putting a new one on the screen check if the image has already been used.

//create variable for last displayed, or something similar
//could use the .includes method.

