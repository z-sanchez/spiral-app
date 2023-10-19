type ProfileIconProps = {
  character: string;
  backgroundColor?: string;
  size?: "large" | "small";
  handleClick?: () => void;
};
const ProfileIcon = ({
  character,
  backgroundColor,
  size,
  handleClick,
}: ProfileIconProps) => {
  return (
    <div
      onClick={() => (handleClick ? handleClick() : null)}
      className={
        "flex justify-center items-center rounded-full outline-2 outline-white drop-shadow-md " +
        (size === "large" ? "h-28 w-28" : "h-7 w-7")
      }
      style={{
        backgroundColor: backgroundColor ? backgroundColor : "",
      }}
    >
      <p
        className={
          "text-center font-semibold text-white " +
          (size === "large" ? "text-5xl" : "text-sm")
        }
      >
        {character}
      </p>
    </div>
  );
};

export { ProfileIcon };
