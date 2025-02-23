import express  from  'express'
import { createProducts, 
    deleteProduct, 
    getAdminProducts, 
    getAllProducts, 
    getSingleProduct, 
    updateProduct,
    createReviewForProduct, 
    getProductReviews
} from '../controller/productController.js'
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js'

const router = express.Router()

// Routes
router.route("/products").get(getAllProducts)

router.route("/admin/products").get(verifyUserAuth, roleBasedAccess('admin'), getAdminProducts)

router.route("/admin/product/create").post(verifyUserAuth, roleBasedAccess('admin'), createProducts)

router.route("/admin/product/:id")
.put(verifyUserAuth, roleBasedAccess('admin'), updateProduct)
.delete(verifyUserAuth, roleBasedAccess('admin'), deleteProduct)

router.route("/product/:id").get(getSingleProduct)
router.route("/review").put(verifyUserAuth, createReviewForProduct)
router.route("/reviews").get(getProductReviews)


export default router