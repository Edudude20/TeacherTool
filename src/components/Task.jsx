import PropTypes from "prop-types";

const Task = ({ selectedTask, handleSelectChange, children }) => {
  //Destructure the different task components from children
  const [MatchTheColumns, TaskX] = children; 
  let renderedComponent = null;

  // Determine the component to render based on the selected task
  switch (selectedTask) {
    case "match-the-columns":
      renderedComponent = MatchTheColumns;
      break;
    case "task-x":
      renderedComponent = TaskX;
      break;
    default:
      renderedComponent = null;
      break;
  }
  return (
    <section>
      <h2>
        4. Task settings <span aria-label="required">*</span>
      </h2>
      <p>
        This is the minigame that the students will play to finish the task.
      </p>
      <p>Please select a task type using the dropdown menu below.</p>
      <label htmlFor="task-type">
        <select
          name="task-type"
          id="task-type"
          value={selectedTask}
          onChange={handleSelectChange}
        >
          <option value="match-the-columns">Match the Columns</option>
          <option value="task-x">Task X</option>
        </select>
        <p>Selected option: {selectedTask}</p>
      </label>
      {renderedComponent}
    </section>
  );
};
Task.propTypes = {
  selectedTask: PropTypes.string.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired,
};

export default Task;
