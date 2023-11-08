interface IInputType {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}

export const productValidation = (product: IInputType) => {
  const errors: IInputType = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  if (!product.title.trim() || product.title.length < 10 || product.title.length > 80) {
    errors.title = "Product title must be between 10 and 80 characters!";
  }

  if (!product.description.trim() || product.description.length < 10 || product.description.length > 900) {
    errors.description = "Product title must be between 10 and 900 characters!";
  }

  return errors;
};
