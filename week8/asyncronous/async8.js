import {
    promises as fs
} from 'fs';

console.log("about to read...");

readFiles()

console.log("...doing other stuff")


async function readFiles() {
    try {
        console.log("starting sequential read...");
        const contents1 = await fs.readFile("test-1.txt", "utf8");
        console.log(contents1);
        const contents2 = await fs.readFile("test-21.txt", "utf8");
        console.log(contents2);
        const contents3 = await fs.readFile("test-3.txt", "utf8");
        console.log(contents3);
    } catch (error) {
        console.error("failed to read a file!", error)
    }
    console.log("...done sequential read");
}