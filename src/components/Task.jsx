import PropTypes from "prop-types";

const TicTacToeComponent = () => {
  return <div>Render the Tic-Tac-Toe content here</div>;
};
const TaskXComponent = () => {
  return <div>Render the Task X content here</div>;
};

const Task = (props) => {
  console.log(props);
  const {
    selectedOption,
    inputs,
    maxOptions,
    handleOptionsChange,
    handleAddOption,
    removeOption,
  } = props;

  let renderedComponent = null;
  
  const isOptionsDisabled = inputs.options.length >= maxOptions; //deactivate "add options" button if max limit is reached
  const optionMaxInputLimit = 30;

  switch (selectedOption) {
    case "match-the-columns":
      renderedComponent = (
        <div>
          <fieldset>
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
                  <button onClick={() => removeOption(index)}>remove</button>
                </div>
              ))}
            </ol>
            <p>
              Options {inputs.options.length}/{maxOptions}
            </p>

            {isOptionsDisabled ? (
              <button className="disabled" disabled>
                Add option
              </button>
            ) : (
              <button onClick={handleAddOption}>add option</button>
            )}
          </fieldset>
        </div>
      );

      break;
    case "tic-tac-toe":
      renderedComponent = <TicTacToeComponent></TicTacToeComponent>;
      break;
    case "task-x":
      renderedComponent = <TaskXComponent></TaskXComponent>;
      break;

    default:
      renderedComponent = null;
      break;
  }

  return <div className="task">{renderedComponent}</div>;
};
Task.propTypes = {
  selectedOption: PropTypes.string.isRequired,
  inputs: PropTypes.object.isRequired,
  maxOptions: PropTypes.number.isRequired,
  handleOptionsChange: PropTypes.func.isRequired,
  handleAddOption: PropTypes.func.isRequired,
  removeOption: PropTypes.func.isRequired,
};

export default Task;
