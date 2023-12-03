export const validateFirstName = new RegExp(/^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/);
export const validateEmail = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
export const validatePass = new RegExp(/^(?=.*[A-Za-z\d])(?=.*[\W_]).{6,}$/);
export const validateLastName = new RegExp(/^[A-Za-z'-]+$/);