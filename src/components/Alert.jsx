const Alert = ({ show, onClose, children, type }) => {
  const borderColor = type === "error" ? "border-red-500" : "border-green-500";
  const textColor = type === "error" ? "text-red-500" : "text-green-500";

  return (
    <div
      className={`mt-4 border px-3 py-2 ${borderColor} ${show ? "flex" : "hidden"} flex-row justify-between items-center`}
    >
      <p className={`text-sm lg:text-lg ${textColor}`}>{children}</p>
      <button className={`${textColor}`} onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Alert;
