import Input from "../Input/Input";

import style from "./titleStyle.module.css";

const Title = () => {
  return (
    <section className="step-4">
      <label htmlFor="title">
        <h2>
          Title <span aria-label="required">*</span>
        </h2>
      </label>
      <p>
        Please write the title of the task. This will show for the students as
        they select their task from the task machine so make it clear.
      </p>
        <Input
          label="title"
          type={"text"}
          id={"title"}
          placeholder={"Example: This task is about the functionalities of..."}
          name={"title"}
          multiline={false}
          validation={{
            required: {
              value: true,
              message: "Please fill this textbox!",
            },
            maxLength: {
              value: 100, //TODO: change this
              message: "Maximum characters 100",
            },
          }}
        ></Input>
    </section>
  );
};

export default Title;
