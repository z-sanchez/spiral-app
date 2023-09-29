const SectionIndicator = ({
  text,
  backgroundColor,
}: {
  text: string;
  backgroundColor: string;
}) => {
  return (
    <div
      className=" self-center rounded-xl px-3 flex items-center py-1"
      style={{ backgroundColor }}
    >
      <p
        className="text-xs  bg-white rounded-full mr-1"
        style={{
          color: backgroundColor,
          padding: " 0 5px",
          fontSize: " .75em",
        }}
      >
        !
      </p>
      <p className="text-white text-xs rounded-xl ">{text}</p>
    </div>
  );
};

export { SectionIndicator };
