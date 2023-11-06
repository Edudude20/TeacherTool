/* eslint-disable react/prop-types */
const TaskX = (props) => {
    console.log(props);

    const testiValue = props.value;

  return (
    <div>TaskX value: {testiValue}</div>
  )
}

export default TaskX