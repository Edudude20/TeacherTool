import PropTypes from "prop-types";
import OptionForm from "./OptionForm";
/**
 * Component to map the list of options
 * @param {array} options Array of options of the Match-the-Columns
 * @param {function} removeOption
 * @returns Component for the list of options
 */
const Options = ({ options, removeOption, handleChange, inputs }) => {
  const maxOptions = 10; //TODO:add maximum limit
  console.log('inputs:', inputs[0]);
  console.log('options:', options);
  return (
    <fieldset>
      <legend>
        Options {options.length}/{maxOptions}
      </legend>
      <ol>
        {/* Create a list item from every object in the array */}
        {options.map((option, index) => (
          <li key={option.id}>
            {option.name}
            <OptionForm
              removeOption={() => removeOption(option, index)}
              handleChange={handleChange}
              optionID={option.id}
              inputs={inputs[option.id]}
            ></OptionForm>
          </li>
        ))}
      </ol>
      <p>
        Options {options.length}/{maxOptions}
      </p>
    </fieldset>
  );
};

Options.propTypes = {
  options: PropTypes.array,
  maxOptions: PropTypes.number,
  removeOption: PropTypes.func,
  handleChange: PropTypes.func,
};

export default Options;
