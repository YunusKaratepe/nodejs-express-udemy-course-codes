/*
setTimeout ( () => {
    console.log('Two seconds are up');
}, 2000)

const names = ["Andrew", "Jen", "Yunus", "Jess"]
const shortNames = names.filter((name) => {
    return name.length <= 4
})

const geocode = (address, callback) => {

    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        }
    
        callback(data)
    }, 2000)

}

geocode('Philadelphia', (data) => {
    console.log(data);
})
*/

const add = (num1, num2, sum) => {
    setTimeout(() => {
        sum(num1 + num2)
    }, 1000)
}



add(1, 4, (res) => {
    console.log(res); // should print 5
})







