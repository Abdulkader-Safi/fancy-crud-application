interface IProps {
  msg: string;
}

// eslint-disable-next-line no-empty-pattern
const ErrorMessage = ({ msg }: IProps) => {
  return msg === "" ? <></> : <span className="block text-red-700 font-semibold text-sm">{msg}</span>;
};

export default ErrorMessage;
