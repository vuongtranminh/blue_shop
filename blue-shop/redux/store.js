import { configureStore } from '@reduxjs/toolkit'

import productModalReducer from './product-modal/productModalSlice'

import cartReducer from './shopping-cart/cartSlide'

import accountReducer from './account/accountSlide'

export const store = configureStore({
    reducer: {
        productModal: productModalReducer,
        cart: cartReducer,
        account: accountReducer,
    },
})