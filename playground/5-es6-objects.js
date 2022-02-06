const user_name = "Yunus"
const user_age = 27

const user = {
    user_name,
    user_age,
    location: "Philadelphia"
}

// console.log(user)

// object destructuring ->
const product = {
    label: "Red notebook",
    price: 3,
    stock: 201,
    sale_price: undefined,
    product_rating: 3
}

/*

const {label, stock, rating} = product
console.log(label, stock, rating);

// or we can name variables as we destructure
// const {label: product_label, stock: product_stock} = product
// console.log(product_label, product_stock);

// and we can create new variables if theres none in given json data
// if product_rating does not exist in product object the it ll have tha value 5.
// but as it exists in the data, it's value is 5
const {label: product_label, stock: product_stock, product_rating = 5} = product
console.log(product_label, product_stock, product_rating);
*/

const transaction = (type, { label, stock } ) => {
    // const {} = myProduct we can destructure in the function brackets.
    console.log(type, label, stock);
}

transaction('order', product)









