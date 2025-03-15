import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';
import '../pageStyles/Home.css';
import ImageSlider from '../components/ImageSlider';
import Product from '../components/Product';
import PageTitle from '../components/PageTitle';

const products = [
  {
      "_id": "67815149972a5bc7f151b78d",
      "name": "product two",
      "description": "Product description for two",
      "price": 200,
      "ratings": 0,
      "image": [
          {
              "public_id": "This is the test id for second product",
              "url": "this is the url for second product",
              "_id": "67815149972a5bc7f151b78e"
          }
      ],
      "category": "shirt",
      "stock": 1,
      "numberOfReviews": 1,
      "reviews": [
          {
              "user": "67acd120a8674e5d1ee37bed",
              "name": "Sunday Ige",
              "rating": 6,
              "comment": "nice product",
              "_id": "67bb37ede290d264be35def8"
          }
      ],
      "createdAt": "2025-01-10T16:56:41.112Z",
      "__v": 1
  },
  {
      "_id": "6783b353d22d4c1b64bb3fac",
      "name": "product three",
      "description": "Product description for three",
      "price": 200,
      "ratings": 0,
      "image": [
          {
              "public_id": "This is the test id for third product",
              "url": "this is the url for third product",
              "_id": "6783b353d22d4c1b64bb3fad"
          }
      ],
      "category": "shirt",
      "stock": 1,
      "numberOfReviews": 0,
      "reviews": [],
      "createdAt": "2025-01-12T12:19:31.199Z",
      "__v": 0
  },
  {
      "_id": "6783b3bcd22d4c1b64bb3faf",
      "name": "product four",
      "description": "Product description for four",
      "price": 200,
      "ratings": 0,
      "image": [
          {
              "public_id": "This is the test id for four product",
              "url": "this is the url for four product",
              "_id": "6783b3bcd22d4c1b64bb3fb0"
          }
      ],
      "category": "shirt",
      "stock": 1,
      "numberOfReviews": 0,
      "reviews": [],
      "createdAt": "2025-01-12T12:21:16.595Z",
      "__v": 0
  }
]

function Home() {
  return (
    <>
      <PageTitle title="Home Page" />
      <Navbar />
      <ImageSlider />
      <div className="home-container">
        <h2 className="home-heading">Treading Now</h2>
        <div className="home-product-container">
          {
            products.map((product, index) => (
              <Product product={product} key={index}/>
            ))
          }
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
