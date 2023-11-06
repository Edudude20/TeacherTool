import PropTypes from "prop-types";
import Button from "../Button";
const MatchTheColumns = (props) => {
  //console.log(props);
  const {
    inputs,
    maxOptions,
    handleOptionsChange,
    handleAddOption,
    removeOption,
  } = props;
  // Check if the "Add Option" button should be disabled
  const isOptionsDisabled = inputs.options.length >= maxOptions;
  const optionMaxInputLimit = 30;
  return (
    <fieldset>
    <legend>Match-The-Columns options</legend>
      <ol>
        {/* Create a list item from every object in the array */}
        {inputs.options.map((option, index) => (
          //TODO:think about changing the name "object"
          <div key={option.id}>
            <input
              type="text"
              name="draggableValue"
              placeholder="Draggable"
              value={option.draggableValue}
              onChange={(event) => handleOptionsChange(event, index)}
              maxLength={optionMaxInputLimit}
            />
            <input
              type="text"
              name="columnEntryValue"
              placeholder="Column Entry"
              value={option.columnEntryValue}
              onChange={(event) => handleOptionsChange(event, index)}
              maxLength={optionMaxInputLimit}
            />
            <Button handleClick={() => removeOption(index)} label="Remove" className="remove-button"></Button>
          </div>
        ))}
      </ol>
      <p>
        Options {inputs.options.length}/{maxOptions}
      </p>

      {isOptionsDisabled ? (
        <Button label="Add option" className="add-button-disabled" isDisabled={isOptionsDisabled}></Button>
      ) : (
        <Button handleClick={handleAddOption} label="Add option" className="add-button"></Button>
      )}
    </fieldset>
  );
};

MatchTheColumns.propTypes = {
  selectedOption: PropTypes.string.isRequired,
  inputs: PropTypes.object.isRequired,
  maxOptions: PropTypes.number.isRequired,
  handleOptionsChange: PropTypes.func.isRequired,
  handleAddOption: PropTypes.func.isRequired,
  removeOption: PropTypes.func.isRequired,
};

export default MatchTheColumns;
