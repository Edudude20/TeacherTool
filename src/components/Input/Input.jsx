/*-------------------------------------------------------------------
|  🐼 React TeacherTool Input
|
|  🦝 RE-USEABLE INPUT COMPOENT
|
|  🐸 Returns:  JSX
https://www.freecodecamp.org/news/how-to-validate-forms-in-react/ 
*-------------------------------------------------------------------*/

import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";

import style from "./inputStyle.module.css";

//Character counter component, turn text red if it goes over maxmimum character limit
const CharCounter = ({ current, max }) => {
  return (
    <span
      style={{ color: current >= max ? "red" : "black" }}
      className={style.charCounter}
    >
      {`${current}/${max}`}
    </span>
  );
};

CharCounter.propTypes = {
  current: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

const Input = ({
  type,
  id,
  placeholder,
  name,
  validation,
  multiline,
  disabled,
}) => {
  // Access the form context. useFormContext is intended to be used in deeply nested structures, where it would become inconvenient to pass the context as a prop.
  // Retrieve the register function to handle validation
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [charCount, setCharCount] = useState(0);

  // checks if validation is defined and if maxLength is defined within it. If either validation or maxLength is undefined,
  //it won't throw an error and will return undefined.
  const maxLength = validation?.maxLength?.value;

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setCharCount(inputText.length);
  };

  return (
    <div className={style.container}>
      {multiline ? (
        <textarea
          id={id}
          type={type}
          className=""
          placeholder={placeholder}
          {...register(`${name}`, validation)}
          onChange={handleInputChange}
          maxLength={maxLength}
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
          onChange={handleInputChange}
          maxLength={maxLength}
          disabled={disabled}
        />
      )}
      <div className={style.validationContainer}>
        {/* errors will return when field validation fails  */}
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ messages }) => {
            return messages
              ? Object.entries(messages).map(([type, message]) => (
                  <p key={type} className={style.validationError}>
                    {message}
                  </p>
                ))
              : null;
          }}
        ></ErrorMessage>
        {/* The char counter only renders if the maxLength prop is provided */}
        {maxLength !== undefined && (
          /* The CharCount component receives the current string length and the max length supported for this field */
          <CharCounter current={charCount} max={maxLength} />
        )}
      </div>
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  validation: PropTypes.object,
  multiline: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
};

export default Input;
