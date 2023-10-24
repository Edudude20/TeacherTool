/* eslint-disable react/prop-types */
import PropTypes from "prop-types";

//TODO: Labels

{/* <label>
<input
  type={type || "text"}
  name="columnEntry"
  onChange={(event) => handleChange(event, index)}
  value={columEntryValue || ""}
  //defaultValue={"default column entry"}
/>
</label> */}

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
      {`draggable-${index}`}
        <input
          type={type || "text"}
          name={`draggable-${index}`}
          onChange={(event) => handleChange(event, index)}
          value={value || ""}
          //defaultValue="default draggable value"
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
