import express from 'express'
import product from './routes/productRoutes.js'
import register from './routes/userRoutes.js'
import order from './routes/orderRoutes.js'
import errorHandleMiddleware from './middleware/error.js'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'


const app = express();

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())

// Routes
app.use("/api/v1", product)
app.use("/api/v1", register)
app.use("/api/v1", order)

app.use(errorHandleMiddleware)

export default app;