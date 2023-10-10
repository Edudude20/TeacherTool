import PropTypes from "prop-types";

//TODO: Labels

/**
 * @param {method} removeOption method to remove an option
 * @returns The list item option for Match-the-columns
 */
const OptionForm = ({ removeOption, handleChange, optionID }) => {
  return (
    <div>
      <label>
        <input
          type="text"
          defaultValue={"default draggable value"}
          name="draggable"
          id={optionID}
          onChange={handleChange}
        />
      </label>
      <label>
        <input
          type="text"
          defaultValue={"default column entry"}
          name="column-entry"
          onChange={handleChange}
          id={optionID}
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
