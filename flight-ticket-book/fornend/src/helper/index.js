import { toast } from "react-toastify";

export const notifySuccess = (name = "Okay") => toast.success(name);
export const notifyError = (name = "Something went wrong") => toast.error(name);
