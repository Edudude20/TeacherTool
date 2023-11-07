import PropTypes from "prop-types";
import Button from "./Button";

const Slides = (props) => {
  const { slides, handleAddSlide, handleSlideChange, removeSlide, maxSlides } = props; //Destructure from props
  const isSlidesDisabled = slides.length >= maxSlides; //deactivate "add slides" button if max limit is reached

  return (
    <section>
      <h2>
        2. Slides <span aria-label="required">*</span>
      </h2>
      <p>
        Please write the description of the task for the students. These will
        show as slide (similarly to PowerPoint) for the students as they open
        the task.
      </p>
      <ol>
      {/* Map the items in the array to display */}
        {slides.map((slide, index) => (
          <div key={slide.id}>
            <label htmlFor="slide">
              <textarea
                name="slideValue"
                id="slide"
                cols="30"
                rows="10"
                maxLength={1000}
                placeholder="Example: This task is about the functionalities of HTML form usability..."
                value={slide.slideValue}
                onChange={(event) => handleSlideChange(event, index)}
              ></textarea>
              <Button handleClick={() => removeSlide(index)} label="Remove" className="remove-button"></Button>
            </label>
          </div>
        ))}
      </ol>
      <p>
        Slides {slides.length}/{maxSlides}
      </p>
      {/* Render the disabled button if the value is true (aka. max number is achieved), otherwise render the normal button */}
      {isSlidesDisabled ? (
        <Button label="Can't add anymore slides" className="add-button-disabled" isDisabled={isSlidesDisabled}></Button>
      ) : (
        <Button handleClick={handleAddSlide} label="Add slide" className="add-button"></Button>
      )}
    </section>
  );
};
Slides.propTypes = {
  slides: PropTypes.array.isRequired,
  handleAddSlide: PropTypes.func.isRequired,
  handleSlideChange: PropTypes.func.isRequired,
  removeSlide: PropTypes.func.isRequired,
  maxSlides: PropTypes.number.isRequired,
};

export default Slides;
