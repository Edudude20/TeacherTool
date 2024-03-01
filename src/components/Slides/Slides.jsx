import Button from "../Button/Button";
import Input from "../Input/Input";
import { useFieldArray } from "react-hook-form";

import style from "./slidesStyle.module.css";

const Slides = () => {
  const maxSlides = 3;

  const { fields, append, remove } = useFieldArray({
    name: "slides",
  });

  const isSlidesDisabled = fields.length >= maxSlides; //deactivate "add slides" button if max limit is reached

  const slides_validation = {
    required: {
      value: true,
      message: "required",
    },
    maxLength: {
      value: 1000,
      message: "Max 1000 characters",
    },
  };

  // if you want to control your fields with watch
  // const watchResult = watch("test");
  // console.log(watchResult);

  return (
    <section id="slides">
      <h2>
        Task Instruction Slides <span aria-label="required">*</span>
      </h2>
      <p>
        Please write the description of the task for the students. These will
        show as slide (similarly to PowerPoint) for the students as they open
        the task.
      </p>
      <ol>
        {/* Map the items in the array to display */}
        {fields.map((slide, index) => (
          <li key={slide.id} className={style.container}>
            <Input
              label={"slide"}
              type={"text"}
              id={slide.id}
              name={`slides.${index}.slideValue`}
              placeholder={
                "Example: This task is about the functionalities of HTML form usability..."
              }
              validation={slides_validation}
              multiline={true}
            ></Input>
            <Button
              handleClick={() => remove(index)}
              label="Remove"
              className="remove-button"
            ></Button>
          </li>
        ))}
      </ol>

      {/* Render the disabled button if the value is true (aka. max number is achieved), otherwise render the normal button */}
      {isSlidesDisabled ? (
        <Button
          label="Can't add anymore slides"
          className="add-button-disabled"
          isDisabled={isSlidesDisabled}
        ></Button>
      ) : (
        <Button
          handleClick={() => append({ slideValue: "" })}
          label="Add slide"
          className="add-button"
        ></Button>
      )}
      <p>
        Slides {fields.length}/{maxSlides}
      </p>
    </section>
  );
};

export default Slides;
