type ProfileIconProps = {
  character: string;
  backgroundColor?: string;
  size?: "large" | "small";
};
const ProfileIcon = ({
  character,
  backgroundColor,
  size,
}: ProfileIconProps) => {
  return (
    <div
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
