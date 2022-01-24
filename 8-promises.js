
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