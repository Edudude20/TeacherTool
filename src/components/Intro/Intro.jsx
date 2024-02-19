import style from "./introStyle.module.css";

const Intro = () => {
  return (
    <div className={style.intro}>
      <h3>Description of this tool</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel nisl
        dui. Sed imperdiet vel purus et dictum. Curabitur eu elit risus. In et
        sapien sit amet justo consequat iaculis. Phasellus in mauris purus. Nunc
        nec dapibus neque, facilisis egestas mauris. Sed efficitur tortor semper
        risus mattis tincidunt. Nam a justo consectetur, elementum tellus sit
        amet, pharetra elit.
        {/* TODO: fill this uusing penpot */}
      </p>
      <p>
        Pellentesque tellus nisl, ultrices nec interdum eu, viverra non odio.
        Fusce ut lectus egestas, vestibulum odio sit amet, efficitur nulla.
        Morbi in ultrices libero, sed imperdiet dolor. Sed ac lacus leo. Quisque
        molestie, nulla sit amet sagittis tempus, urna sem tincidunt tellus, sit
        amet euismod sem odio ac libero. Proin in convallis sem. Duis sed odio
        odio. Integer faucibus ante elit, eu semper leo egestas vitae. Nullam
        vel semper leo, eget hendrerit dui.
      </p>
    </div>
  );
};

export default Intro;
