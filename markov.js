// // /** Textual markov chain generator */
// const fs = require('fs');
// const process = require('process');

//HYPOTHESIS-- I CANNOT ACCESS MY TEXTARR VAR BECAUSE IT IS SCOPED TO MY CONSTRUCTOR
// I'm working on adapting the logic here https://codepen.io/alexkramerbanjo/pen/mvPQYM to be object-oriented and I cannot work out the textArr variable
class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {

    let textArr = text.split(/[ \r\n]+/);
    this.textArr = textArr.filter(c => c !== "");

    this.makeChains();
    this.makeText();


  }
  //   /** set markov chains:
  //    *  for text of "the cat in the hat", chains will be
  //    *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
  markovChain = {};
  makeChains = () => {
    // const markovChain = {}
    for (let i = 0; i < this.textArr.length; i++) {
      let word = this.textArr[i].toLowerCase().replace(/[\W_]/, "")
      if (!this.markovChain[word]) {
        this.markovChain[word] = []
      }
      if (this.textArr[i + 1]) {
        this.markovChain[word].push(this.textArr[i + 1].toLowerCase().replace(/[\W_]/, ""));
      }
    }
    return this.markovChain;
  }
  //   /** return random text from chains */


  makeText = (numWords = 100) => {
    let words = Object.keys(this.makeChains(this.textArr))
    let word = words[Math.floor(Math.random() * words.length)]
    let result = ''
    for (let i = 0; i < numWords; i++) {
      result += word + ' ';
      let newWord = this.markovChain[word][Math.floor(Math.random() * this.markovChain[word].length)]
      word = newWord;
      if (!word || !this.markovChain.hasOwnProperty(word)) word = words[Math.floor(Math.random() * words.length)]
    }
    return result;
  }

}

module.exports = {
  MarkovMachine,
};
// let mm = new MarkovMachine("the cat in the hat"); //instantiated
// mm.makeText();

// console.log(mm.makeText());