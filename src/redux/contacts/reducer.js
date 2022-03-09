import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id: 1,
        first_name: 'Christopher',
        last_name: 'Delos Reyes',
        middle_name: 'Cinco',
        mobile_no: '09972686236',
        email: 'delosreyeschris77@gmail.com'
    },
    {
        id: 2,
        first_name: 'Mike',
        last_name: 'Cargajente',
        middle_name: '',
        mobile_no: '09976236268',
        email: 'cargajentemike@gmail.com'
    }
];

const contactSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addContact: (state, action) => {
            state = [...state, action.payload];
            return state;
        },
        updateContact: (state, action) => {
            const updated_state = state.map(contact => contact.id === action.payload.id ? action.payload : contact);
            state = updated_state;
            return state;
        },
        deleteContact: (state, action) => {
            const deleted_state = state.filter(contact => contact.id !== action.payload);
            state = deleted_state;
            return state;
        }
    },
});
export const { addContact, updateContact, deleteContact } = contactSlice.actions;

export default contactSlice.reducer;

