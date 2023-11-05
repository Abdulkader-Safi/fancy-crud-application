interface IProps {
  imageURL: string;
  alt: string;
  className: string;
}

// eslint-disable-next-line no-empty-pattern
const Image = ({ imageURL, alt, className }: IProps) => {
  return <img src={imageURL} alt={alt} className={className} />;
};

export default Image;
