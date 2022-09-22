const { writeFile, readFile } = require('fs');
const axios = require("axios");
const { runInContext } = require('vm');

function logorWrite(data, target) {
    if (target) {
        writeFile(target, data, "utf8", (err) => {
            console.log(err);
            process.exit(1);
        });
    }
    else {
        console.log(data);
    }
}

function cat(path, target) {
    readFile(path, "utf8", (err, data) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        logorWrite(data, target);
    });
}

async function webCat(path, target) {
    try {
        const res = await axios.get(path);
        logorWrite(res.data, target);
    }
    catch (e) {
        console.log(e);
        process.exit(1);
    }
}

function isURL(path) {
    try {
        new URL(path);
        return true;
    }
    catch {
        return false;
    }
}

async function start() {
    const arg1 = process.argv[2];
    if (arg1) {
        if (arg1 === "--out") {
            const target = process.argv[3];
            const from = process.argv[4];
            if (target && from) {
                if(isURL(from)){
                    webCat(from, target);
                }
                else{
                    cat(from, target);
                }
            }
            else {
                console.log("--out requires both a path to write to, and a location to write from");
            }
        }
        else {
            if (isURL(arg1)) {
                webCat(arg1);
            }
            else {
                cat(arg1);
            }
        }
    }
    else {
        console.log("Please enter a path");
    }
}
start();