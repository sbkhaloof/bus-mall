'use strict';
let part = [];
let attempts = 0;
let maxAttempt = 25;
let attemptsEL = document.getElementById('attempts');
let busmall = [];
let productNameArray = [];
let Votes = [];
let views = [];
function BusmallImg(productName) {
    this.productName = productName.split('.')[0];
    this.imagePath = 'img/' + productName
    this.shownTimes = 0;
    this.clicks = 0;
    busmall.push(this);
    // settingItems();
    productNameArray.push(this.productName);
}


let busmallImg = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];
for (let i = 0; i < busmallImg.length; i++) {
    new BusmallImg(busmallImg[i]);
}


function generateImg() {
    return Math.floor(Math.random() * busmall.length);
}

function settingItems()
{
    let data = JSON.stringify(busmall);
    // console.log(data);
    localStorage.setItem('bus', data);
    
}

function gettingItems() {
    let stringobj= localStorage.getItem('bus');
    let normalobj = JSON.parse(stringobj);
    if (normalobj !== null) {
        busmall = normalobj;
    }
    renderimg();
}
let LimgEL = document.getElementById('left_img');
let MimgEL = document.getElementById('med_img');
let RimgEL = document.getElementById('right_img');

let leftImgIndex;
let midImgIndex;
let rightImgIndex;
function renderimg() {
    leftImgIndex = generateImg();
    midImgIndex = generateImg();
    rightImgIndex = generateImg();

    while (leftImgIndex === midImgIndex || midImgIndex === rightImgIndex
        || rightImgIndex === leftImgIndex || part.includes(leftImgIndex)
        || part.includes(midImgIndex) || part.includes(rightImgIndex)) {
        leftImgIndex = generateImg();
        midImgIndex = generateImg();
        rightImgIndex = generateImg();
    }
    part[0] = leftImgIndex;
    part[1] = midImgIndex;
    part[2] = rightImgIndex;

    LimgEL.setAttribute('src', busmall[leftImgIndex].imagePath);
    LimgEL.setAttribute('title', busmall[leftImgIndex].imagePath);
    busmall[leftImgIndex].shownTimes++;

    MimgEL.setAttribute('src', busmall[midImgIndex].imagePath);
    MimgEL.setAttribute('title', busmall[midImgIndex].imagePath);
    busmall[midImgIndex].shownTimes++;

    RimgEL.setAttribute('src', busmall[rightImgIndex].imagePath);
    RimgEL.setAttribute('title', busmall[rightImgIndex].imagePath);
    busmall[rightImgIndex].shownTimes++;
    attemptsEL.textContent = attempts;

}
renderimg();

LimgEL.addEventListener('click', Clicks);
MimgEL.addEventListener('click', Clicks);
RimgEL.addEventListener('click', Clicks);

function Clicks(event) {
    attempts++;
    if (attempts <= maxAttempt) {
        console.log(event.target.id);
        if (event.target.id = 'left_img') { busmall[leftImgIndex].clicks++; }
        else if (event.target.id = 'mid_img') { busmall[midImgIndex].clicks++; }
        else if (event.target.id = 'right_img') { busmall[rightImgIndex].clicks++; }
        renderimg();

    }

    else {
        let buttEL = document.getElementById('butt');
        buttEL.addEventListener('click', result);


        LimgEL.removeEventListener('click', Clicks);
        MimgEL.removeEventListener('click', Clicks);
        RimgEL.removeEventListener('click', Clicks);

settingItems();
    }

}

function chartRender() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productNameArray,
            datasets: [{
                label: '# of Votes',
                data: Votes,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 3
            }, {
                label: '# of views',
                data: views,
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 3
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function result() {
    let ulEL = document.getElementById('result');
    let liEL;

    for (let i = 0; i < busmall.length; i++) {
        liEL = document.createElement('li');
        ulEL.appendChild(liEL);
        liEL.textContent = (`${busmall[i].productName} had ${busmall[i].clicks} votes, and was seen ${busmall[i].shownTimes} times.`);
        Votes.push(busmall[i].clicks);
        views.push(busmall[i].shownTimes);
    }
    chartRender();
}
gettingItems();




