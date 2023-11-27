import Input from "./Input";

const Title = () => {
  return (
    <section>
      <h2>
        Title <span aria-label="required">*</span>
      </h2>
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
            message: "this is required",
          },
          maxLength: {
            value: 10, //TODO: change this
            message: "Maximum characters 10",
          },
        }}
      ></Input>
    </section>
  );
};

export default Title;