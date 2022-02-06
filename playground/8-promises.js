// part 1
/*

const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            prod_id: "95",
            prod_name: "Keyboard"
        })

        reject('This is error message!')
    }, 2000)
})


doWorkPromise.then((result) => {
    console.log('Success!', result);
}).catch((err) => {
    console.log(err);
})

*/

// part 2

const add = (a, b) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(a + b)
        }, 2000)
    })
}

// correct result but syntax getting complex
// add(1, 2).then((sum) => {
//     console.log(sum);

//     add(sum, 6).then((sum2) => {
//         console.log(sum2);
//     }).catch((err) => {
//         console.log(err);
//     })
// }).catch((err) => {
//     console.log(err);
// }) 

add(1, 2).then((sum) => {
    console.log(sum);
    return add(sum, 6)
}).then((sum2) => {
    console.log(sum2);
}).catch((err) => {
    console.log(err);
})













