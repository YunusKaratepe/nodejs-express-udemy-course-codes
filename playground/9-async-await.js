// const doWork = async () => {
//     throw new Error("This is an error!")
//     return "Yunus"
// }

// doWork().then((res) => {
//     console.log(res);
// }).catch((e) => {
//     console.log(e);
// })


const add = (a, b) => {
    return new Promise((res, rej) => {
        setTimeout(() => {

            if (a < 0 | b < 0)
                rej("Big error!!!")

            res(a + b)
        }, 2000)
    })
}

const doWork = async () => {
    const sum1 = await add(1, 99)
    const sum2 = await add(sum1, -50)
    const sum3 = await add(sum2, 3)
    return sum3
}


doWork().then((res) => {
    console.log(res);

}).catch((err) => {
    console.log(err);
})







