interface ILogoProps {
  width?: number;
  height?: number;
  onClick?: () => void;
}

const Logo = ({ width = 32, height = 32, onClick }: ILogoProps) => {
  return (
    <img
      alt="logo"
      width={`${width}px`}
      height={`${height}px`}
      src="./image.png"
      className="rounded-full cursor-pointer"
      onClick={onClick}
    />
  );
};
export default Logo;
