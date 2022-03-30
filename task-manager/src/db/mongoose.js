if (process.env.MONGODB_URL.endsWith("test")) {
    TextEncoder = require("util").TextEncoder
    TextDecoder = require("util").TextDecoder
}
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
})
