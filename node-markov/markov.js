/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    this.chains = {};
    for (let widx in this.words) {
      if (this.chains[this.words[widx]]) {
        this.chains[this.words[widx]].push(this.words[parseInt(widx) + 1] || null);
      }
      else {
        this.chains[this.words[widx]] = ([this.words[parseInt(widx) + 1]] || [null]);
      }
    }
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    const chains = this.chains;
    let word = this.words[Math.floor(Math.random() * this.words.length)]
    // capitalize first word.
    let text = word.charAt(0).toUpperCase() + word.slice(1);

    for (let i = 1; i < numWords; i++) {
      const wordchain = chains[word];
      word = wordchain[Math.floor(Math.random() * wordchain.length)]
      if(word){
        text += ` ${word}`
      }
      else{
        return text;
      }
    }
    return text;
  }
}


module.exports = { MarkovMachine };