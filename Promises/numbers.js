// Part 1, Numbers
const BASE_URL = "http://numbersapi.com";
const favFactList = document.getElementById("favNumFacts");
const multiNumList = document.getElementById("multiNumFacts");
let favNumFact = axios.get(`${BASE_URL}/13?json`);
//1
favNumFact
    .then(res => {
        console.log(res.data.text);
    })
    .catch(err => {
        console.log("something went wrong", err);
    });
//2
let multiNumFacts = axios.get(`${BASE_URL}/7,14,21?json`);
multiNumFacts
    .then(res => {
        for (let key in res.data) {
            // console.log(res.data[key]);
            const factLI = document.createElement("LI");
            factLI.innerText = res.data[key];
            multiNumList.append(factLI);
        }
    })
    .catch(err => {
        console.log("something went wrong", err);
    });
// 3
const favNumFacts = []
for (let i = 0; i < 4; i++) {
    favNumFacts.push(axios.get(`${BASE_URL}/13?json`));
};
Promise.all(favNumFacts)
    .then(resArray => {
        for (const res of resArray) {
            const factLI = document.createElement("LI");
            factLI.innerText = res.data.text;
            favFactList.append(factLI);
            // console.log(res.data.text);
        };
    })
    .catch(err => {
        console.log("something went wrong", err);
    });