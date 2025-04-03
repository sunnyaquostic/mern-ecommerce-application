import Product from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFunctionality from "../utils/apiFunctionality.js";

export const createProducts = handleAsyncError( async (req, res, next) => {
    // console.log(req.body)
    req.body.user = req.user.id;
    const product = await Product.create(req.body)
    res.status(200).json({
        success:true,
        product
    })
})

export const getAllProducts = handleAsyncError( async(req, res, next) => {
    const resultsPerPage = 4
    const apiFeatures = new APIFunctionality(Product.find(), req.query)
    .search()
    .filter();

    // Getting filtered query before pagination
    const filteredQuery = apiFeatures.query.clone()
    const productCount  = await filteredQuery.countDocuments()

    const totalPages = Math.ceil(productCount / resultsPerPage)
    const page = Number(req.query.page) || 1

    if (page > totalPages && productCount > 0) {
        return next(new HandleError("This page doesn't exist!"))
    }

    // applying pagination
    apiFeatures.pagination(resultsPerPage)
    const products = await apiFeatures.query

    if (!products || products.length == 0) {
        return next(new HandleError("No product found", 404))
    }

    res.status(200).json({
        success:true,
        products,
        productCount,
        totalPages,
        resultsPerPage,
        currentPage: page
    })
})

// export const getSingleProduct = (req, res) => {
//     res.status(200).json({
//         message: "Single Product"
//     })
// } 

// update product
export const updateProduct = handleAsyncError( async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators:true
    })

    if(!product) {
        return next(new HandleError("Product Not Found", 404))
    }

    res.status(200).json({
        success: true,
        product
    })
})

// delete product
export const deleteProduct = handleAsyncError( async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
        return next(new HandleError("Product Not Found", 404))
    }

    res.status(200).json({
        success: true,
        message: `produdct with id: ${product.id} is deleted successfully`
    })
})

// singled product
export const getSingleProduct = handleAsyncError( async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new HandleError("Product Not Found", 404))
    }

    res.status(200).json({
        success: true,
        product
    })
})

export const getAdminProducts= handleAsyncError(async (req, res, next) => {
    const products = await Product.find()
    res.status(200).json({
        success: true,
        products
    })
})

export const createReviewForProduct = handleAsyncError(async (req, res, next) => {
    const  {rating, comment, productId} = req.body
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating,
        comment,
    }

    const product = await Product.findById(productId)

    if(!product) {
        return next(new HandleError("Product not found", 404))
    }

    const reviewExists = product.reviews.find(review => review.user.toString() === req.user.id.toString())
    if (reviewExists) {
        product.reviews.forEach(review => {
            if(review.user.toString() === req.user.id.toString()){
                review.rating=rating,
                review.comment=comment
            }
        })
    } else {
        product.reviews.push(review)
    }
    
    product.numberOfReviews=product.reviews.length
    let sum = 0;
    product.reviews.forEach(review => {
        sum += review.rating
    })

    product.ratings = product.reviews.length > 0 ? sum / product.reviews.length : 0

    await product.save({validateBeforeSave: false})
    res.status(200).json({
        success: true,
        product
    })
})

export const getProductReviews = handleAsyncError(async (req, res, next) => {
    const product  = await Product.findById(req.query.id);
    if(!product) {
        return next(new HandleError("Product not found", 404))
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

export const deleteProductReview = handleAsyncError(async (req, res, next) => {
    const product  = await Product.findById(req.query.productId);
    if(!product) {
        return next(new HandleError("Product not found", 404))
    }

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.toString())
    
    let sum = 0;
    reviews.forEach(review => {
        sum += review.rating
    })

    const ratings = reviews > 0 ? sum / reviews.length : 0
    const numberOfReviews = reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numberOfReviews
    }, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        message: "Review deleted successfully"
    })
})

