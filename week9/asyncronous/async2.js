console.log('before')
let i = 0
while (i < 5) {
    setTimeout(() => {
        console.log('i: ' + i)
    }, 0);
    i++
}
console.log('after')