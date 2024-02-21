import PropTypes from "prop-types";

import style from './buttonStyle.module.css'

const Button = (props) => {
  const { handleClick, label, className, isDisabled } = props;
  
  return (
    <div className={style.container}>
      <button onClick={handleClick} className={className} disabled={isDisabled}>{label}</button>
    </div>
  );
};
Button.propTypes = {
  handleClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
};

export default Button;
