import * as yup from 'yup';

export const getSchema = (contacts, currentContact = null) => {
    yup.addMethod(yup.string, "emailExists", function (errorMessage) {
        return this.test(`email`, errorMessage, function (value) {
            const { path, createError } = this;
            const existing_contact = contacts.find(contact => contact.email === value);

            return (
                !!currentContact ? (existing_contact ? !!(currentContact.email === existing_contact.email) : !existing_contact) : !existing_contact ||
                    createError({ path, message: errorMessage })
            );
        });
    });

    yup.addMethod(yup.string, "mobileNoExists", function (errorMessage) {
        return this.test(`mobile_no`, errorMessage, function (value) {
            const { path, createError } = this;
            const existing_contact = contacts.find(contact => contact.mobile_no === value);
            return (
                !!currentContact ? (existing_contact ? !!(currentContact.mobile_no === existing_contact.mobile_no) : !existing_contact) : !existing_contact ||
                    createError({ path, message: errorMessage })
            );
        });
    });

    const schema = yup.object().shape({
        first_name: yup.string().required('first name is required.'),
        last_name: yup.string().required('last name is required.'),
        middle_name: yup.string(),
        email: yup.string()
            .email().required()
            .emailExists((obj) => {
                return `Email ${obj.value} Already Exists`;
            }),
        mobile_no: yup.string()
            .required('mobile no. is required.')
            .min(11, 'mobile no. must be 11 digits.')
            .max(11, 'mobile no. must be 11 digits.')
            .matches(/^(09)\d{9}$/, 'mobile no number is not valid')
            .mobileNoExists(`mobile No. Already Exists`)
    }).required();

    return schema;
}

export const loginSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required()
}).required();