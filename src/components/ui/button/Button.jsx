// const currantColor = localStorage.getItem("color");
export default function Button({
  children,
  type,
  color = "#fff",
  rounded = "rounded-full",
  backgroundColor = "#7CC9D1",
  className = "",
  isReverse = false,
  onClick = () => {},
  width,
  loading,
  disabled,
  ...rest
}) {
  const handleClick = (e) => {
    onClick(e);
  };
  // console.log(disabled, "disableddisabled");
  return (
    <button
      disabled={loading || disabled}
      type={type}
      onClick={handleClick}
      style={{
        backgroundColor: isReverse ? color : backgroundColor,
        color: isReverse ? backgroundColor : color,
      }}
      className={`flex items-center justify-center  text-lg h-fit px-4 py-1 ${width} ${
        isReverse
          ? "reverse border-2 border-current"
          : "border-2 border-[#7CC9D1]"
      } ${color} ${rounded} ${className}`}
      {...rest}
    >
      <div className={`children ${className} `}>{children}</div>
    </button>
  );
}
