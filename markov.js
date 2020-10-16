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
    this.makeText()

  }
  //   /** set markov chains:
  //    *  for text of "the cat in the hat", chains will be
  //    *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains = () => {

    const markovChain = {}
    for (let i = 0; i < this.textArr.length; i++) {
      let word = this.textArr[i].toLowerCase().replace(/[\W_]/, "")
      if (!markovChain[word]) {
        markovChain[word] = []
      }
      if (this.textArr[i + 1]) {
        markovChain[word].push(this.textArr[i + 1].toLowerCase().replace(/[\W_]/, ""));
      }
    }
    return markovChain;
  }
  //   /** return random text from chains */


  makeText = () => {
    words = Object.keys(this.makeChains(this.textArr))
    let word = words[Math.floor(Math.random() * words.length)]
    let result = ''
    for (let i = 0; i < words.length; i++) {
      result += word + ' ';
      let newWord = markovChain[word][Math.floor(Math.random() * markovChain[word].length)]
      word = newWord;
      if (!word || !markovChain.hasOwnProperty(word)) word = words[Math.floor(Math.random() * words.length)]
    }
    return result;
  }

}

let mm = new MarkovMachine("the cat in the hat"); //instantiated
console.log(mm)
mm.makeText();

console.log(mm.makeText());