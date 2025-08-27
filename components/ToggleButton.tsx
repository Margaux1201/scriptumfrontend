const ToggleButton = (props: {
  handleToggleChange: Function;
  isChecked: boolean;
}) => {
  const handleClick = (): void => {
    props.handleToggleChange(props.isChecked);
  };

  return (
    <div>
      <label
        style={{
          position: "relative",
          display: "inline-block",
          width: 50,
          height: 28,
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={props.isChecked}
          onChange={handleClick}
          style={{ opacity: 0, width: 0, height: 0 }}
        />
        <span
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: props.isChecked ? "#E28413" : "#ccc",
            borderRadius: 28,
            transition: "0.4s",
          }}
        />
        <span
          style={{
            position: "absolute",
            height: 22,
            width: 22,
            left: props.isChecked ? 26 : 4,
            bottom: 3,
            backgroundColor: "white",
            borderRadius: "50%",
            transition: "0.4s",
          }}
        />
      </label>
    </div>
  );
};

export default ToggleButton;
