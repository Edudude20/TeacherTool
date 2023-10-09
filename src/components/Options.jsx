import PropTypes from 'prop-types';
import OptionForm from './OptionForm';
/**
 * Component to map the list of options
 * @param {array} options Array of options of the Match-the-Columns
 * @param {function} removeOption
 * @returns Component for the list of options
 */
const Options = ({ options, removeOption }) => {

    const maxOptions = 10; //TODO:add maximum limit
    return (
      <div>
        <ol>
          {/* Create a list item from every object in the array */}
          {options.map((option, index) => (
            <li key={option.id}>
              {option.name}
              <OptionForm
                removeOption={() => removeOption(option, index)}
              ></OptionForm>
            </li>
          ))}
        </ol>
      </div>
    );
  };

  Options.propTypes = {
    options: PropTypes.array,
    maxOptions: PropTypes.number,
    removeOption: PropTypes.func
  }

  export default Options;