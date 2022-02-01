import React from 'react'
import {ErrorMessage,useField} from "formik"

export const TextField = ({label, ...props})=> {
    const [field,meta] = useField(props)
    return (
        <div className="mt-5 mb-5">
            <label className="form-label" htmlFor={field.name}>{label}</label>
            <input className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}  {...field} {...props} autoComplete="off"/>
            <ErrorMessage component="div" name={field.name} className="error mb-2 mt-2" />
        </div>
    )
}
