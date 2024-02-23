import LanguageSelector from "../Language/LanguageSelector";
import style from "./headerStyle.module.css";

const Header = () => {
  return (
    <header className={style.headerContainer}>
      <div>
        <h1>AIIS POLIS</h1>
        <h2>(Peer-to-peer Online Learning and Innovation System)</h2>
      </div>
      <LanguageSelector></LanguageSelector>
    </header>
  );
};

export default Header;
