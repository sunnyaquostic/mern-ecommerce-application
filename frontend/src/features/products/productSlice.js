import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getProduct =createAsyncThunk('product/getProduct', async (_, {rejectWithValue}) => {
    try {
        const link = '/api/vi/products'
        const { data } = await axios.get(link)
        console.log('Response', data)

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
        error: null
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
        })
        .addCase(getProduct.rejected, (state, action) => {
            state.loading = false
            state.error    = action.payload || 'Something went wrong'
        })
    }
})

export const {removeErrors} = productSlice.actions
export default productSlice.reducer