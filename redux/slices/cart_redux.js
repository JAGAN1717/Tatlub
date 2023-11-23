import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItem: null,
    cartList: [],
    type: 'regular',
    totalAmount: null,
    subscriptionSubTotal: null,
}

const handleIncrementedTotal = (
    basePrice,
    quantity,
) => {
        const mainPrice = basePrice * quantity
        return mainPrice - mainPrice 
}



export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        cart: (state, action) => {
            state.cartList = action.payload
        },
        setType: (state = initialState, action) => {
            state.type = action.payload
        },
        setCart: (state = initialState, action) => {
            let isPayloadItemMatches = false
            if (state.cartList.length > 0) {
                for (let i = 0; i < state.cartList.length; i++) {
                    if (
                        state.cartList[i]?.id === action.payload?.id
                    ) {
                        isPayloadItemMatches = true
                        state.cartList[i] = {
                            ...state.cartList[i],
                            totalPrice:
                                state.cartList[i].totalPrice +
                                action.payload.totalPrice,
                            quantity:
                                state.cartList[i].quantity +
                                action.payload.quantity,
                        }
                        return
                    } else {
                        isPayloadItemMatches = false
                    }
                }
                if (!isPayloadItemMatches) {
                    state.cartList.push(action.payload)
                }
            } else {
                state.cartList = [
                    {
                        ...action.payload,
                    },
                ]
            }
        },
        setVariationToCart: (state = initialState, action) => {
            let isAvailable = state.cartList.filter(
                (item) => item.id === action.payload.id
            )
            if (isAvailable.length > 0) {
                let isA = isAvailable.filter((item) =>
                    item.variation.some(
                        (va) =>
                            JSON.stringify(va) ===
                            JSON.stringify(action.payload.variation[0])
                    )
                )
                if (isA.length === 0) {
                    state.cartList.push(action.payload)
                }
            }
        },
        setUpdateVariationToCart: (state = initialState, action) => {
            const index = state.cartList.findIndex(
                (item, index) => index === action.payload.indexNumber
            )
            const newData = state.cartList.map((item, i) =>
                i === index ? action.payload.newObj : item
            )
            state.cartList = newData
        },
        setUpdateCart: (state = initialState, action) => {
            const newData = state.cartList.map((item) =>
                item.id === action.payload.id
                    ? {
                          ...item,
                          totalPrice: action.payload.totalPrice,
                          quantity: action.payload.quantity,
                      }
                    : item
            )
            state.cartList = newData
        },
        addProductToCart: (state, action) => {
        },
        incrementProductQty: (state = initialState, action) => {
            let newData
            const totalPrice = action.payload.itemBasePrice * (action.payload.quantity + 1)

                newData = state.cartList.map((item) =>
                    item?.id === action.payload?.id
                        ? {
                              ...item,
                              totalPrice: totalPrice,
                              quantity: action.payload.quantity + 1,
                          }
                        : item
                )
                state.cartList = newData
        },
        decrementProductQty: (state = initialState, action) => {
            let newData
            const totalPrice = action.payload.itemBasePrice * (action.payload.quantity - 1)
                newData = state.cartList.map((item) =>
                item?.id === action.payload?.id
                        ? {
                              ...item,
                              totalPrice: totalPrice,
                              quantity: action.payload.quantity - 1,
                          }
                        : item
                )
                state.cartList = newData

        },
        removeProduct: (state = initialState, action) => {
            let newData
                newData = state.cartList.filter(
                    (item) => item?.id !== action.payload?.id
                ) 
                state.cartList = newData
        },
        setClearCart: (state = initialState, action) => {
            state.cartList = []
        },
        setCartItemByDispatch: (state, action) => {
            state.cartItem = action.payload
        },
        setTotalAmount: (state, action) => {
            state.totalAmount = action.payload
        },
        setSubscriptionSubTotal: (state, action) => {
            state.subscriptionSubTotal = action.payload
        },
        setReorderCartItemByDispatch: (state, action) => {
            state.cartList = [...state.cartList, ...action.payload]
        },
    },
})

export const {
    cart,
    setCart,
    addProductToCart,
    incrementProductQty,
    decrementProductQty,
    removeProduct,
    setClearCart,
    setReorderCartItemByDispatch,
    setSubscriptionSubTotal,
    setVariationToCart,
    setUpdateVariationToCart,
    setType,
    setCartItemByDispatch,
    setUpdateCart,
    setTotalAmount,
} = cartSlice.actions
export default cartSlice.reducer