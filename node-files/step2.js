const { readFile } = require('fs');
const axios = require("axios");

function cat(path) {
    readFile(path, "utf8", (err, data) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        console.log(data);
    });
}

async function webCat(path) {
    try{
        const res = await axios.get(path);
        console.log(res.data);
    }
    catch(e){
        console.log(e);
    }
}



const path = process.argv[2];
if (path) {
    try{
        // should error if path is not a URL
        new URL(path);
        webCat(path);
    }
    catch(e){
        // will run if path isn't a URL, since it catches the error
        cat(path);
    }
}
else {
    console.log("Please enter a path");
}