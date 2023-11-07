import PropTypes from "prop-types";
import Button from "../Button";
const MatchTheColumns = (props) => {
  //TODO add comments
  const {
    inputs,
    maxOptions,
    handleOptionsChange,
    handleAddOption,
    removeOption,
    handleAddFalseMatch,
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
          <li key={option.id}>
            {option.isFalseMatch ? (
              <>
                <input
                  type="text"
                  name="columnEntryValue"
                  placeholder="Empty (false match)"
                  disabled
                />
                <input
                  type="text"
                  name="draggableValue"
                  placeholder="Draggable"
                  value={option.draggableValue}
                  onChange={(event) => handleOptionsChange(event, index)}
                  maxLength={optionMaxInputLimit}
                />
                <p>&rarr;</p>
                <textarea
                  name="draggableDefinition"
                  id=""
                  cols="30"
                  rows="2"
                  maxLength={100}
                  placeholder="Draggable definition text here"
                  value={option.draggableDefinition}
                  onChange={(event) => handleOptionsChange(event, index)}
                ></textarea>
              </>
            ) : (
              <>
                <input
                  type="text"
                  name="columnEntryValue"
                  placeholder="Column Entry"
                  value={option.columnEntryValue}
                  onChange={(event) => handleOptionsChange(event, index)}
                  maxLength={optionMaxInputLimit}
                />
                <input
                  type="text"
                  name="draggableValue"
                  placeholder="Draggable"
                  value={option.draggableValue}
                  onChange={(event) => handleOptionsChange(event, index)}
                  maxLength={optionMaxInputLimit}
                />
                <p>&rarr;</p>
                <textarea
                  name="draggableDefinition"
                  id=""
                  cols="30"
                  rows="2"
                  maxLength={100}
                  placeholder="Draggable definition text here"
                  value={option.draggableDefinition}
                  onChange={(event) => handleOptionsChange(event, index)}
                ></textarea>
              </>
            )}
            <Button
              handleClick={() => removeOption(index)}
              label="Remove"
              className="remove-button"
            ></Button>
          </li>
        ))}
      </ol>
      <p>
        Options {inputs.options.length}/{maxOptions}
      </p>

      {isOptionsDisabled ? (
        <Button
          label="Can't add anymore options"
          className="add-button-disabled"
          isDisabled={isOptionsDisabled}
        ></Button>
      ) : (
        <>
          <Button
            handleClick={handleAddOption}
            label="Add option"
            className="add-button"
          ></Button>
          <Button
            handleClick={handleAddFalseMatch}
            label="Add false match"
            className="add-button"
          ></Button>
        </>
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
  handleAddFalseMatch: PropTypes.func.isRequired,
};

export default MatchTheColumns;
