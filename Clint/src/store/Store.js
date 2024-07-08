import {configureStore} from "@reduxjs/toolkit"
import auth from "./auth";
const Store = configureStore({
    reducer: {
        auth: auth.reducer,
    }
})

export default Store;