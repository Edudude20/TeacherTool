/*-------------------------------------------------------------------
|  🐼 React TeacherTool Input
|
|  🦝 Todo: CREATE RE-USEABLE INPUT COMPOENT
|
|  🐸 Returns:  JSX
https://www.freecodecamp.org/news/how-to-validate-forms-in-react/ 
*-------------------------------------------------------------------*/
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const Input = ({
  label,
  type,
  id,
  placeholder,
  name,
  validation,
  multiline,
}) => {
  // Access the form context. useFormContext is intended to be used in deeply nested structures, where it would become inconvenient to pass the context as a prop.
  // Retrieve the register function to handle validation
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="">
      <label htmlFor={id} className="">
        {multiline ? (
          <textarea
            id={id}
            type={type}
            className=""
            placeholder={placeholder}
            cols={"30"}
            rows={"10"}
            {...register(`${name}`, validation)}
          ></textarea>
        ) : (
          <input
            id={id}
            type={type}
            className=""
            placeholder={placeholder}
            // register your input into the hook by invoking the "register" function
            // include validation with required or other standard HTML validation rules
            // label is the name of the input, which will be used as a key within your form context to access the input's value or retrieve its error message
            {...register(name, validation)}
          />
        )}
        {/* errors will return when field validation fails  */}
        {/* TODO: handle multiple error messages */}
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ messages }) => {
            console.log("messages", messages);
            return messages
              ? Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                ))
              : null;
          }}
        ></ErrorMessage>
      </label>
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  validation: PropTypes.object.isRequired,
  multiline: PropTypes.bool.isRequired,
};

export default Input;
