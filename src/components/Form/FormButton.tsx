const FormButton = ({
  onClick,
  text,
  alternateStyle,
}: {
  onClick: () => void;
  text: string;
  alternateStyle?: boolean;
}) => {
  return (
    <button
      className={`my-2 py-2 rounded-lg w-full text-white ${
        alternateStyle ? "bg-green-500" : "bg-purple-500"
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export { FormButton };
