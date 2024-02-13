import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}

const CircleColor = ({ color, ...rest }: IProps) => {
  return <span className={` bg-[${color}] block mb-1 w-5 h-5 rounded-full cursor-pointer`} {...rest} />;
};

export default CircleColor;
