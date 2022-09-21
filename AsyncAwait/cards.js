// Part 2, deck of cards
const BASE_URL = "https://deckofcardsapi.com/api/deck";

class Deck {
    constructor() {
        this.button = document.createElement("button");
        this.button.innerText = "Draw a Card";
        this.cardimg = document.createElement("img");
        this.init();
    }
    async init(){
        await this.shuffle();
        document.body.append(this.button);
        document.body.append(document.createElement("br"));
        document.body.append(this.cardimg);
        this.button.addEventListener("click", this.draw.bind(this));
    }
    async shuffle() {
        if (this.deck_id) {
            try {
                const res = await axios.get(`${BASE_URL}/${this.deck_id}/shuffle`);
                this.deck_id = res.data.deck_id;
                this.remaining = res.data.remaining;
            }
            catch (e) {
                console.log("Something went wrong", e)
            }
        }
        else {
            try {
                const res = await axios.get(`${BASE_URL}/new/shuffle`);
                this.deck_id = res.data.deck_id;
                this.remaining = res.data.remaining;
            }
            catch (e) {
                console.log("Something went wrong", e)
            }
        }
    }
    async draw(){
        const res = await axios.get(`${BASE_URL}/${this.deck_id}/draw`);
        this.cardimg.src = res.data.cards[0].image;
        this.remaining = res.data.remaining;
        if(this.remaining === 0){
            this.button.remove();
        }
    }
}
const deck = new Deck();