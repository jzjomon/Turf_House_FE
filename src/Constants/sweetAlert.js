import Swall from "sweetalert2";

export const Alert = (text, icon, cancelBtn, confirmBtn) => {
    return (
        Swall.fire({
            title : text,
            icon : icon,
            showCancelButton : (cancelBtn ? true : false),
            showConfirmButton : (confirmBtn ? false : true)
        })
    )
};

export const Toast = (text, icon) => {
    return (
        Swall.mixin({
            toast : true,
            position : "top-end",
            timer : 2000,
            timerProgressBar : true,
            showConfirmButton : false,
        }).fire({
            title : text,
            icon : icon,
        })
    )
}

