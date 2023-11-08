interface productValidationType {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}

export const productValidation = (product: productValidationType) => {
  const errors: productValidationType = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);

  if (!product.title.trim() || product.title.length < 10 || product.title.length > 80) {
    errors.title = "Product title must be between 10 and 80 characters!";
  }

  if (!product.description.trim() || product.description.length < 10 || product.description.length > 900) {
    errors.description = "Product title must be between 10 and 900 characters!";
  }

  if (!product.imageURL.trim() || !validUrl) {
    errors.imageURL = "Valid Image URL is required!";
  }

  if (!product.price.trim() || !isNaN(Number(product.price))) {
    errors.price = "Valid Price is required!";
  }

  return errors;
};
