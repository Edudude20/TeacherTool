const Description = () => {
    return (
      <div>
        <p>
          Please write the description of the task for the students. These will
          show as slide (similarly to PowerPoint) for the students as they open
          the task.
        </p>
        <textarea
          id="title"
          rows={4}
          cols={50}
          defaultValue={"description default"}
        ></textarea>
        <button>+ add new description slide</button>
      </div>
    );
  };

  export default Description;