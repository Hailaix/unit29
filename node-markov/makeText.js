/** Command-line tool to generate Markov text. */
const { readFile } = require('fs');
const axios = require('axios');
const { MarkovMachine } = require("./markov");


const loc = process.argv[2];
const path = process.argv[3];

async function getfromurl(url) {
    try {
        const res = await axios.get(url);
        gen(res.data);
    }
    catch (e) {
        console.log(e);
        process.exit(1);
    }
}

function gen(text) {
    const markov = new MarkovMachine(text);
    console.log(markov.makeText());
}

if (loc === "file") {
    if (path) {
        readFile(path, "utf8", (err, text) => {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            //make text
            gen(text);
        });
    }
    else {
        console.log("You must input a path");
    }
}
else if (loc === "url") {
    if (path) {
        getfromurl(path);
    }
    else {
        console.log("You must input a path");
    }
}
else {
    console.log("Text must be generated from either a file or a url");
    process.exit(1);
}
