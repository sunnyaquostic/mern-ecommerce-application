import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addItemsToCart = createAsyncThunk('cart/addItemsToCart', async ({id, quantity}, {rejectWithValue}) =>{
    try {
        const {data} = await axios.get(`/api/v1/product/${id}`)
        // console.log(data);
        
        return {
            product: data.product._id,
            name: data.product.name,
            price:data.product.price,
            image:data.product.image[0].url,
            stock:data.product.stock,
            quantity
        }
    } catch (error) {
        console.log('this is the error');
        return rejectWithValue(error.response?.data || 'An Error Occured')
    }
})


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
        loading: false,
        error: null,
        success: false,
        message: null,
        removingId: null,
        shippingInfo:  JSON.parse(localStorage.getItem('shippingInfo')) || {},
    },

    reducers: {
        removeErrors: (state) => {
            state.error = null
        },

        removeMessage: (state) => {
            state.message = null
        },

        removeItemFromCart: (state, action) => {
            state.removingId=action.payload;
            state.cartItems=state.cartItems.filter(item=>item.product != action.payload)
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            state.removingId = null
        },
        saveShippingInfo: (state, action) => {
            state.shippingInfo = action.payload
            localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo))
        }
    },
    
    extraReducers: (builder) => {
        builder
        .addCase(addItemsToCart.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(addItemsToCart.fulfilled, (state, action) => {
            const item = action.payload
            const existingItems = state.cartItems.find((i) => i.product === item.product)
            if(existingItems) {
                existingItems.quantity = item.quantity
                state.message = `Updated ${item.name} quantity in the cart successfully`
            } else {
                state.cartItems.push(item)
                state.message = `${item.name} is added to cart successfully`
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            state.loading = false,
            state.error = null,
            state.success= true
        })
        .addCase(addItemsToCart.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || 'An Error Occured'
        })
    }
})

export const  { removeErrors, removeMessage, removeItemFromCart, saveShippingInfo } = cartSlice.actions
export default cartSlice.reducer