type ProfileIconProps = {
  character: string;
  styles?: string;
  backgroundColor?: string;
};
const ProfileIcon = ({
  character,
  styles,
  backgroundColor,
}: ProfileIconProps) => {
  return (
    <div
      className={
        "h-7 w-7 flex justify-center items-center rounded-full outline-2 outline-white drop-shadow-md " +
        styles
      }
      style={{
        backgroundColor: backgroundColor ? backgroundColor : "",
      }}
    >
      <p className="text-center font-semibold text-sm text-white ">
        {character}
      </p>
    </div>
  );
};

export { ProfileIcon };
