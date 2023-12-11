export const validateFirstName = new RegExp(/^\s*[A-Za-z]+\s*$/);
export const validateEmail = new RegExp(/^\s*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\s*$/)
export const validatePass = new RegExp(/^(?=.*[A-Za-z\d])(?=.*[\W_]).{6,}$/);
export const validateLastName = new RegExp(/^\s*[A-Za-z]+\s*$/);