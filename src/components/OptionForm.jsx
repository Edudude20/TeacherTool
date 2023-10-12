/* eslint-disable react/prop-types */
import PropTypes from "prop-types";

//TODO: Labels

/**
 * @param {method} removeOption method to remove an option
 * @returns The list item option for Match-the-columns
 */
const OptionForm = ({ objValue, removeOption, handleChange, index, optionID, inputs }) => {
  //removeOption, handleChange, optionID, inputs

  console.log(objValue);

  const {label, type, value, id, draggableValue, columEntryValue} = objValue;
  return (
    <div>
      <label>
        <input
          type={type || "text"}
          //defaultValue="default draggable value"
          id={id}
          name="draggable"
          onChange={(event) => handleChange(event, index)}
          value={draggableValue || ""}

        />
      </label>
      <label>
        <input
          type={type || "text"}
          //defaultValue={"default column entry"}
          id={id}
          name="columnEntry"
          onChange={(event) => handleChange(event, index)}
          value={columEntryValue || ""}
        />
      </label>
      <button onClick={removeOption}>remove</button>
    </div>
  );
};

OptionForm.propTypes = {
  removeOption: PropTypes.func,
  handleChange: PropTypes.func
};

export default OptionForm;
