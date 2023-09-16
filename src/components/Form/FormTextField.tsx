import { useState } from "react";

const FormTextField = ({
  placeholderText,
  value,
  label,
  type,
  onBlur,
}: {
  placeholderText: string;
  type?: string;
  label?: string;
  value: string;
  onBlur: (newValue: string) => void;
}) => {
  const [valueState, setValueState] = useState(value);
  return (
    <div className="flex flex-col w-full my-2">
      {label ? (
        <label className="text-sm text-gray-400 py-2">{label}</label>
      ) : null}
      <input
        className="py-2 rounded-md px-3 border-2 bg-white"
        type={type ? type : "text"}
        placeholder={placeholderText}
        value={valueState}
        onBlur={(e) => onBlur(e.target.value)}
        onChange={(e) => setValueState(e.target.value)}
      ></input>
    </div>
  );
};

export { FormTextField };
