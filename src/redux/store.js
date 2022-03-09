import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/reducer';
import contactReducer from './contacts/reducer';

const reducer = {
    auth: authReducer,
    contacts: contactReducer
}
const store = configureStore({
    reducer: reducer,
    devTools: true
})

export default store;