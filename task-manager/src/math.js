const calculateTip = (total, tipPercentage=0.25) => {
    return total + total * tipPercentage;
}



module.exports = {
    calculateTip
}