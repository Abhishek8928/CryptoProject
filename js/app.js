import { url, options } from "./apiConfig.js"

let cryptoCount = document.querySelector("#totalCrypto");
let totalCryptoMarket = document.querySelector("#totalMarket");
let renderCoinsData = document.querySelector(".coins-wrapper");
let renderNewsData = document.querySelector(".main-wrapper");
let shimmer = "";
let cryptoCoins;


for (let i = 1; i <= 12; i++){

    shimmer += `<div class="shimmer">
    <div class="shimmer-top">
        <h2></h2>
    </div>
    <div class="shimmer-bottom">
        <div></div>
        <div></div>
        <div></div>
    </div>
</div>`
}

async function getApiData() {
    renderCoinsData.innerHTML = shimmer;
    let response = await fetch(url, options)
    let json = await response.json();

    renderCoinsData.innerHTML = "";

    let { totalCoins, totalMarkets } = json?.data?.stats

    cryptoCount.innerText = totalCoins;
    totalCryptoMarket.innerText = `${totalMarkets} K`;

    cryptoCoins = json.data.coins;



    createDataCard(cryptoCoins);
}

getApiData();

function createDataCard(coins) {
    coins.map((item) => {
        let { change, name, marketCap, iconUrl, price, rank } = item;
        let cardWapper = document.createElement("div");
        cardWapper.classList.add("card");
        let cardTop = document.createElement("div");
        cardTop.classList.add("card-top");
        let cardTitle = document.createElement("h2");
        cardTitle.innerHTML = `<h2>${rank}.${name} </h2>`
        let icon = document.createElement("img");
        icon.src = iconUrl;
        cardTop.append(cardTitle);
        cardTop.append(icon);
        cardWapper.append(cardTop)

        //card-bottom
        let markCap = marketCap.slice(0,3)
        let cardBottom = document.createElement("div");
        cardBottom.classList.add("card-bottom")
        let displayPrice = document.createElement("p");
        displayPrice.innerText = `price : ${Math.ceil(price)} $`;
        let displayMarketCap = document.createElement("p");
        displayMarketCap.innerText = `Market Cap : ${`${markCap}`} B`;
        let displayDailyChange = document.createElement("p");
        displayDailyChange.innerText = `Daily Change : ${change} %`;
        cardBottom.append(displayPrice);
        cardBottom.append(displayMarketCap);
        cardBottom.append(displayDailyChange);
        cardWapper.append(cardBottom);
        renderCoinsData.append(cardWapper)
    })
}

let getInputValue = document.getElementById("input");
getInputValue.addEventListener("input", getInputText);

function getInputText(e) {
    let filterData = cryptoCoins.filter((index) => {
        return index?.name?.toLowerCase()?.includes(e?.target?.value);
    })
    if (filterData.length == 0){
        renderCoinsData.innerHTML = shimmer;
    }
    else {
        renderCoinsData.innerHTML = '';
    createDataCard(filterData);
    }
    
}

let hamburger = document.querySelector(".hamburger");
let leftCont = document.querySelector(".left-con");
let rightCont = document.querySelector(".right-con")

hamburger.addEventListener("click", function () {
    leftCont.classList.toggle("show-nav");
    if (leftCont.classList.contains("show-nav"))
    {
        rightCont.style.marginLeft= "26rem"
    }
    else {
        rightCont.style.marginLeft= "0rem"
    }
    
})

const newsUrl = 'https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk';
const headerOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'b52272fe8emshe2ddd0de74196c0p1ebf92jsn27a3bf3e3c6c',
      'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
    }
};

async function getApiNewsData() {
    try {
        let res = await fetch(newsUrl,headerOptions);
    let jsonFormat = await res.json();
    console.dir(jsonFormat.data);

    displayNews(jsonFormat.data)
    }
    catch (error) {
        console.log(error)
    }
}
let storyCon = document.querySelector(".story-wrapper")
function displayNews(news) {

    news?.map((x) => {
    let { createdAt, description, thumbnail, title, url } = x;
    let cardCon = document.createElement("div");
    cardCon.classList.add("stories");
    let storyImg = document.createElement("div");
    storyImg.classList.add("story-img");
    let img = document.createElement("img");
    img.src = thumbnail;
    storyImg.append(img);
    cardCon.append(storyImg);

    let storyDataCon = document.createElement("div");
    storyDataCon.classList.add("story-data");

    let storyTitle = document.createElement("h2");
        storyTitle.classList.add("story-title");
        storyTitle.innerText = title;

    let stroyDesc = document.createElement("h2");
        stroyDesc.classList.add("story-desc");
        stroyDesc.innerText = description;
    let postedDate = document.createElement("p");
    postedDate.classList.add("story-posted-date");
    postedDate.innerText = createdAt;

    storyDataCon.append(storyTitle);
    storyDataCon.append(stroyDesc);
    storyDataCon.append(postedDate);

    cardCon.appendChild(storyDataCon);
        
    storyCon.append(cardCon)
    })



}

// news data
let getNews = document.getElementById("news");
let intro = document.querySelector(".intro"); 
let inputHolder = document.querySelector(".input-wrapper");

getNews.addEventListener("click", () => {
    intro.classList.remove("d-none");
    inputHolder.classList.add("d-none");
    renderCoinsData.innerHTML = "";
    getApiNewsData()

})

let home = document.getElementById("home");

home.addEventListener("click", () => {
    intro.classList.add("d-none");
    inputHolder.classList.remove("d-none")
    storyCon.innerHTML = "";
    getApiData();


})