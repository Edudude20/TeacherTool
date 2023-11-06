import PropTypes from "prop-types";

const Button = (props) => {
  const { handleClick, label, className, isDisabled } = props;
  return (
    <>
      <button onClick={handleClick} className={className} disabled={isDisabled}>{label}</button>
    </>
  );
};
Button.propTypes = {
  handleClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
};

export default Button;
