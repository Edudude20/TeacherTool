/* eslint-disable react/prop-types */
/*-------------------------------------------------------------------
|  🐼 React TeacherTool Input
|
|  🦝 Todo: CREATE RE-USEABLE INPUT COMPOENT
|
|  🐸 Returns:  JSX
*-------------------------------------------------------------------*/

import React from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";

const findInputError = (errors, name) => {
  const filtered = Object.keys(errors)
    .filter((key) => key.includes(name))
    .reduce((cur, key) => {
      return Object.assign(cur, { error: errors[key] });
    }, {});
  return filtered;
};

const isFormInvalid = (err) => {
  if (Object.keys(err).length > 0) return true;
  return false;
};

const Input = ({ label, type, id, placeholder }) => {
  // Access the form context. useFormContext is intended to be used in deeply nested structures, where it would become inconvenient to pass the context as a prop.
  // Retrieve the register function to handle validation
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputError = findInputError(errors, label);
  const isInvalid = isFormInvalid(inputError);

  return (
    <div className="">
      <div className="">
        <label htmlFor={id} className="">
          {label}
          <input
            id={id}
            type={type}
            className=""
            placeholder={placeholder}
            // register your input into the hook by invoking the "register" function
            // include validation with required or other standard HTML validation rules
            // label is the name of the input, which will be used as a key within your form context to access the input's value or retrieve its error message
            {...register(label, {
              required: {
                value: true,
                message: "required",
              },
              minLength: 6,
            })}
          />
          {/* errors will return when field validation fails  */}
          {errors.label && <span>This field is required</span>}
        </label>
      </div>
    </div>
  );
};

const InputError = ({ message }) => {
  <div className="">{message}</div>;
};

Input.propTypes = {};

export default Input;
