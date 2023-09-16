const FormButton = ({
  onClick,
  text,
}: {
  onClick: () => void;
  text: string;
}) => {
  return (
    <button
      className="my-2 py-2 rounded-lg bg-purple-500 w-full text-white"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export { FormButton };
