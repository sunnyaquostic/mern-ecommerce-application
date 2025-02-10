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
    const resultsPerPage = 3
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
