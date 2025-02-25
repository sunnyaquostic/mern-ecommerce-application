import express from 'express'
import { createNewOrder, 
    getSingleOrder 
} from '../controller/orderController.js'
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js'

const router = express.Router()

router.route('/new/order').post(verifyUserAuth, createNewOrder)
router.route('/admin/order/:id').get(verifyUserAuth, roleBasedAccess('admin'), getSingleOrder)

export default router