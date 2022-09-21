// Part 2, deck of cards
const BASE_URL = "https://deckofcardsapi.com/api/deck";
//Get a shuffled deck for 1 & 2
let deck = axios.get(`${BASE_URL}/new/shuffle/`);
let deck_id = null;
// 1 & 2
deck
    .then(res => {
        // console.log(res);
        // get the deck id of the deck
        deck_id = res.data.deck_id;
        // draw a card from the deck
        return axios.get(`${BASE_URL}/${deck_id}/draw`);
    })
    .then(res => {
        // log the card drawn from the deck
        // console.log(res.data);
        console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`);
        //draw another card from the deck
        return axios.get(`${BASE_URL}/${deck_id}/draw`);
    })
    .then(res => {
        // log the card drawn from the deck
        // console.log(res.data);
        console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`);
    })
    .catch(err => console.log(err));

// 3
const cardimg = document.getElementById("currentCard");
const button = document.createElement("button");
button.innerText = "Draw a Card";
let drawdeck = axios.get(`${BASE_URL}/new/shuffle/`);
let drawdeck_id = null;
drawdeck.then(res => {
    drawdeck_id = res.data.deck_id;
    document.body.prepend(button);
});
button.addEventListener("click", evt => {
    // handle the event
    axios.get(`${BASE_URL}/${drawdeck_id}/draw`)
        .then(res => {
            // console.log(res.data)
            cardimg.src = res.data.cards[0].image;
            // if the deck is empty, remove the button
            if(res.data.remaining === 0){
                button.remove();
            }
        });
});