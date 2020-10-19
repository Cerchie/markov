/** Command-line tool to generate Markov text. */
const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");
const validUrl = require('valid-url');

function getText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}
/** read file and generate text from it. */
function makeText(path) {
    fs.readFile(path, "utf8", function (err, data) {
        if (err) {
            console.log("couldn't read file")
        } else {
            getText(data)
        }
    });
}
/** read URL and make text from it. */
async function webCat(url, out) { //reading page at url now
    try {
        let resp = await axios.get(url);
        getText(resp.data, out); //calling handleOutput here so data is read properly using out var
    } catch (err) { //err handling
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}
/** interpret cmdline to decide what to do. */

let [method, path] = process.argv.slice(2); //Where everyday CLI arguments are concerned, you'll want to skip the first two. 

if (method === "file") {
    makeText(path);
} else if (method === "url") {
    webCat(path);
} else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}