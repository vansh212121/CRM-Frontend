import { toast } from "sonner";

export const handleError = (err, action = "Action") => {
    let errorTitle = `${action} Failed`;
    let errorMessage = "An unknown error occurred. Please try again.";

    if (err?.data?.error?.code && err?.data?.error?.message) {
        errorTitle = err.data.error.code.replace(/_/g, ' ');
        errorMessage = err.data.error.message;
    }

    else if (err?.data?.detail) {
        if (Array.isArray(err.data.detail)) {
            const firstError = err.data.detail[0];
            const field = firstError.loc[1] || 'Input';
            const msg = firstError.msg;
            const cleanField = field.toString().charAt(0).toUpperCase() + field.toString().slice(1);
            errorTitle = "Validation Error";
            errorMessage = `${cleanField}: ${msg}`;
        } else {
            errorMessage = err.data.detail;
        }
    }

    toast.error(errorTitle, {
        description: errorMessage,
    });

    console.error(`${action} Error:`, err);
};