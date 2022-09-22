const { readFile } = require('fs');

function cat(path) {
    readFile(path, "utf8", (err, data) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        console.log(data);
    });
}
const path = process.argv[2];
if (path) {
    cat(path)
}
else {
    console.log("Please enter a path");
}