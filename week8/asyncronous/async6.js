import {
    promises as fs
} from 'fs';

console.log("about to read...");
fs.readFile("test-1.txt", "utf8").then((contents) => {
    console.log(contents);
    return fs.readFile("test-2.txt", "utf8")
}).then((contents) => {
    console.log(contents);
    return fs.readFile("test-3.txt", "utf8")
}).then((contents) => {
    console.log(contents)
}).catch((error) => {
    console.error('File read failed', error)
});

console.log("...done");