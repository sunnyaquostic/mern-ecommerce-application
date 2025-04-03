import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getProduct =createAsyncThunk('product/getProduct', async ({keyword, page = 1}, {rejectWithValue}) => {
    try {
        const link = keyword 
        ? `/api/v1/products?keyword=${encodeURIComponent(keyword)}&page=${page}` 
        : `/api/v1/products?page=${page}`
        const { data } = await axios.get(link)
        console.log('Response', data)

        return data

    } catch (error) {
        return rejectWithValue(error.response?.data || "An error occured")
    }
})

export const getProductDetails =createAsyncThunk('product/getProductDetails', async (id, {rejectWithValue}) => {
    try {
        const link = `/api/v1/product/${id}`
        const { data } = await axios.get(link)

        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || "An error occured")
    }
})

const productSlice = createSlice({
    name: 'product',
    initialState : {
        products: [],
        productCount: 0, 
        loading: false,
        error: null,
        product:null,
        resultsPerPage: 4,
        totalPages:0
    },
    reducers : {
        removeErrors : (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getProduct.fulfilled, (state, action) => {
            console.log('Fulfilled action payload', action.payload)
            state.loading = false
            state.error = null;
            state.products = action.payload.products
            state.productCount = action.payload.productCount
            state.resultsPerPage = action.payload.resultsPerPage
            state.totalPages = action.payload.totalPages
        })
        .addCase(getProduct.rejected, (state, action) => {
            state.loading = false
            state.error    = action.payload || 'Something went wrong'
            state.products = []
        })

        builder.addCase(getProductDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getProductDetails.fulfilled, (state, action) => {
            console.log('Fulfilled action payload', action.payload)
            state.loading = false
            state.error = null;
            state.product = action.payload.product
        })
        .addCase(getProductDetails.rejected, (state, action) => {
            state.loading = false
            state.error    = action.payload || 'Something went wrong' 
        })
    }
})

export const {removeErrors} = productSlice.actions
export default productSlice.reducer