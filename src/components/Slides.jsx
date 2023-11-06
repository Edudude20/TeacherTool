import PropTypes from "prop-types";

const Slides = (props) => {
  const { slides, handleAddSlide, handleSlideChange, removeSlide, maxSlides } = props;
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
              <button onClick={() => removeSlide(index)}>remove</button>
            </label>
          </div>
        ))}
      </ol>
      <p>
        Slides {slides.length}/{maxSlides}
      </p>
      {isSlidesDisabled ? (
        <button className="disabled" disabled>
          Add slide
        </button>
      ) : (
        <button onClick={handleAddSlide}>Add slide</button>
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
