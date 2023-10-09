/**
 * @param {method} removeOption method to remove an option
 * @returns The list item option for Match-the-columns
 */
const OptionForm = ({removeOption}) => {
    return (
      <div>
        <label>
          <input type="text" defaultValue={"default draggable value"} />
        </label>
        <button onClick={removeOption}>remove</button>
      </div>
    );
  };

  export default OptionForm;