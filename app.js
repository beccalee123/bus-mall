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

//array for bar graph
var votingData = [];

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

//add if/else statement for local storage
window.onload = function(){
  if (localStorage.allProductsStorage){
    console.log('did it work');
    allProducts = JSON.parse(localStorage.getItem('allProductsStorage'));
    // displayPics()
    renderChart();
  } else {
    for (var i = 0; i < names.length; i++) {
      new Product(names[i]);
    }
    displayPics();
  }
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
  console.log(output);

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
  while (output[0] === secondNum || justViewed.includes(secondNum)) {
    console.log('duplicate detected on second');
    // reroll
    secondNum = makeRandom();
  }
  output.push(secondNum);

  // generate 3rd number
  var thirdNum = makeRandom();
  // if it matches... 
  while (output[0] === thirdNum || output[1] === thirdNum || justViewed.includes(thirdNum)) {
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
  for (var i = 0; i < allProducts.length; i++) {
    if (event.target.alt === allProducts[i].name) {
      allProducts[i].votes++;
    }
  }
  //handle total number of votes allowed
  if (totalClicks === 25) {
    container.removeEventListener('click', handleClick);
    localStorage.setItem('allProductsStorage', JSON.stringify(allProducts)); // sets up local storage for all products
    console.log('Added to local storage')
    return renderChart(); //this return statement will kick us out of the loop
  }
  displayPics();
}

function showList() {
  for (var i = 0; i < allProducts.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = `${allProducts[i].name} has ${allProducts[i].views} views and ${allProducts[i].votes} votes`;
    productList.appendChild(liEl);

  }
}

function getVotes() {
  for (var i = 0; i < allProducts.length; i++) {
    votingData[i] = allProducts[i].votes;
  }
}


//++++++++++++++++++++++++++++++
// CODE THAT EXECUTES ON PAGE LOAD
//++++++++++++++++++++++++++++++

container.addEventListener('click', handleClick);

//++++++++++++++++++++++++++++++
// CHART!!!!!!
//++++++++++++++++++++++++++++++


var ctx = document.getElementById('voting-results').getContext('2d');
function renderChart() {
  getVotes();
  console.log(names)
  console.log(votingData)
  console.log('last reached line');
  new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: names,
      datasets: [{
        label: "Vote Results",
        data: votingData,
        backgroundColor: 'rgb(63, 191, 161)',
        borderColor: 'rgb(0, 0, 0)',
        borderWidth: 1,
      }]
    },
    options: {
      responsive: false
    }
  });
  console.log('last line');
}