
const mongoose = require('mongoose');
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    //useNewUrlParser: true,
    //useCreateIndex: true,
    //useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 3; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author:  '62cb18078a5b015101ffe8c1',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'this is a filler descriptionthis is a filler descriptionthis is a filler descriptionthis is a filler descriptionthis is a filler descriptionthis is a filler descriptionthis is a filler descriptionthis is a filler descriptionthis is a filler description',
            price,
            images:  [
                {
                  //url: 'https://res.cloudinary.com/aleck/image/upload/v1657856686/YelpCampv2/rajkfwcvikl7rvbar4lb.webp',
                  url: 'https://www.collinsdictionary.com/images/full/valley_163664957_1000.jpg',
                  filename: 'YelpCampv2/rajkfwcvikl7rvbar4lb'
                },
                {
                  url: 'https://res.cloudinary.com/aleck/image/upload/v1657856686/YelpCampv2/zktjihg967a5xy6fi7ut.jpg',
                  filename: 'YelpCampv2/zktjihg967a5xy6fi7ut'
                }
              ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});