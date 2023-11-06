import PropTypes from 'prop-types'

const Title = (props) => {
    const { inputs, handleFormChange } = props;
    return (
      <section>
        <h2>
          1. Title <span aria-label="required">*</span>
        </h2>
        <p>
          Please write the title of the task. This will show for the students as
          they select their task from the task machine so make it clear.
        </p>
        <label htmlFor="title">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Example: This task is about the functionalities of..."
            value={inputs.title}
            onChange={(event) => handleFormChange(event)}
          />
        </label>
      </section>
    );
  };
  Title.propTypes = {
    inputs: PropTypes.object.isRequired,
    handleFormChange: PropTypes.func.isRequired,
  };

export default Title