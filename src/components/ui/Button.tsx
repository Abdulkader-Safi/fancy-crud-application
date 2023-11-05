import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className: string;
  width?: "w-full" | "w-fit";
}

// eslint-disable-next-line no-empty-pattern
const Button = ({ className, children, width = "w-full", ...rest }: IProps) => {
  return (
    <button type="button" className={`${className} ${width} p-2 rounded-md text-white`} {...rest}>
      {children}
    </button>
  );
};
export default Button;
