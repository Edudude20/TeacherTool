/* eslint-disable react/prop-types */
/*-------------------------------------------------------------------
|  🐼 React TeacherTool Input
|
|  🦝 Todo: CREATE RE-USEABLE INPUT COMPOENT
|
|  🐸 Returns:  JSX
*-------------------------------------------------------------------*/
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";


const Input = ({ label, type, id, placeholder }) => {
  // Access the form context. useFormContext is intended to be used in deeply nested structures, where it would become inconvenient to pass the context as a prop.
  // Retrieve the register function to handle validation
  const {
    register,
    formState: { errors },
  } = useFormContext();


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
                message: "this is required",
              },
              maxLength: {
                value: 10,
                message: "This input exceed maxLength.",
              },
            })}
          />
          {/* errors will return when field validation fails  */}
          {/* TODO: handle multiple error messages */}
          <ErrorMessage
            errors={errors}
            name={label}
            render={({ message }) => <p>{message}</p>}
          ></ErrorMessage>
        </label>
      </div>
    </div>
  );
};


Input.propTypes = {};

export default Input;
