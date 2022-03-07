import * as actions from '../ActionTypes';

export const addContact = payload => ({
    type: actions.ADD_CONTACT,
    payload
});

export const updateContact = payload => ({
    type: actions.UPDATE_CONTACT,
    payload
})

export const deleteContact = payload => ({
    type: actions.DELETE_CONTACT,
    payload
})