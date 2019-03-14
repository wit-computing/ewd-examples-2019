import http from 'http';
const server = http.createServer((req, res) => { 
    res.writeHead(200);
    // n is assigned a random number between 0 and 9999
    let n = Math.floor(Math.random() * 10000);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) { 
            console.log(`Iteration ${i}.${j}`);
        }
    }
    res.end("Finished Counting");
});
server.listen(8080);