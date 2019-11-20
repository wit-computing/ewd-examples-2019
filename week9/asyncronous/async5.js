import {
    promises as fs
} from 'fs';

console.log("about to read...");
fs.readFile("test-12.txt", "utf8").then((contents) => {
    console.log(contents);
}).catch((error) => {
    console.error("Failed to read file!", error)
});

console.log("...done");