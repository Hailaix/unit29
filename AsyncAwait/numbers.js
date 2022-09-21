// Part 1, Numbers
const BASE_URL = "http://numbersapi.com";
const favFactList = document.getElementById("favNumFacts");
const multiNumList = document.getElementById("multiNumFacts");

// 1
async function getNumFact(num){
    try{
        const res = await axios.get(`${BASE_URL}/${num}?json`);
        return res.data.text;
    }
    catch(e){
        console.log("Invalid num or API down", e);
    }
}
console.log(getNumFact(13));

// 2
async function getFactsOnNums(...nums){
    try{
        const res = await axios.get(`${BASE_URL}/${nums}?json`);
        for(const key in res.data){
            const factLI = document.createElement("li");
            factLI.innerText = res.data[key];
            multiNumList.append(factLI);
        }
    }
    catch(e){
        console.log("Something went wrong", e);
    }
}
getFactsOnNums(7,14,21);

// 3
async function getFactsOnNum(num, amt){
    const reqs = [];
    try{
        for(let i = 0; i < amt; i++){
            reqs.push(axios.get(`${BASE_URL}/${num}?json`));
        }
        const ress = await Promise.all(reqs);
        for(const res of ress){
            const factLI = document.createElement("li");
            factLI.innerText = res.data.text;
            favFactList.append(factLI);
        }
    }
    catch(e){
        console.log("Something went wrong", e);
    }
}
getFactsOnNum(7,4);