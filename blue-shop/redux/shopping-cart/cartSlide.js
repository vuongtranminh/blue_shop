import { createSlice } from '@reduxjs/toolkit'

let cartItems = []
let cartTotalItems = 0;

if(typeof window !== 'undefined') {
    cartItems = localStorage.getItem('cart-items') !== null ? JSON.parse(localStorage.getItem('cart-items')) : []
    cartTotalItems = localStorage.getItem('cart-total-items') !== null ? JSON.parse(localStorage.getItem('cart-total-items')) : 0
}

const initialState = {
    cartItems: cartItems,
    cartTotalItems: cartTotalItems,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addItem: (state, action) => {
            const newItem = action.payload
            
            state.cartItems = [...state.cartItems, newItem]
            state.cartTotalItems = state.cartTotalItems + newItem.quantity
            localStorage.setItem('cart-total-items', JSON.stringify(state.cartTotalItems))
            localStorage.setItem('cart-items', JSON.stringify(state.cartItems))
        },

        updateItem: (state, action) => {
            const newItem = action.payload
            const item = state.cartItems.find(e => e.id === newItem.id)
            if (item) {
                state.cartItems = state.cartItems.filter(e => e.id !== newItem.id)
                const updateItem = {
                    ...item,
                    quantity: newItem.quantity,
                }
                state.cartItems = [...state.cartItems, updateItem]
                state.cartTotalItems = state.cartTotalItems - item.quantity + newItem.quantity

            }
            localStorage.setItem('cart-total-items', JSON.stringify(state.cartTotalItems))
            localStorage.setItem('cart-items', JSON.stringify(state.cartItems))
        },

        removeItem: (state, action) => {
            const id = action.payload
            state.cartItems = state.cartItems.filter(e => e.id !== id)
            state.cartTotalItems = state.cartItems.reduce((total, item) => total + Number(item.quantity), 0)
            localStorage.setItem('cart-total-items', JSON.stringify(state.cartTotalItems))
            localStorage.setItem('cart-items', JSON.stringify(state.cartItems))
        },

        checkedAllItems: (state, action) => {
            const cartItems = action.payload
            state.cartItems = cartItems
            localStorage.setItem('cart-items', JSON.stringify(state.cartItems))
        },

        removeCheckedAllItems: (state, action) => {
            state.cartItems = []
            localStorage.setItem('cart-items', JSON.stringify(state.cartItems))
        },

    },
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem, updateItem, checkedItem, checkedAllItems, removeCheckedAllItems } = cartSlice.actions

export default cartSlice.reducer