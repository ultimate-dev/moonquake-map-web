import { createRipples } from "react-ripples";

class RippleProps {
  children?: JSX.Element | JSX.Element[];
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const ReactRipple = createRipples({});

const Ripple = (props: RippleProps) => {
  if (!props.disabled)
    return (
      <ReactRipple
        {...props}
        onClick={() => setTimeout(() => props.onClick && props.onClick(), 80)}
        className={"cursor-pointer w-full h-full p-0 m-0 " + props.className}
      />
    );
  else
    return (
      <div className={"cursor-default w-full h-full p-0 m-0 " + props.className}>
        {props.children}
      </div>
    );
};
const Button = ({ onClick, children }: any) => {
  return (
    <div className="border-white border border-opacity-20 m-1 rounded">
      <Ripple onClick={onClick} className="px-4 py-2">
        <span className="opacity-60">{children}</span>
      </Ripple>
    </div>
  );
};
export default Button;
