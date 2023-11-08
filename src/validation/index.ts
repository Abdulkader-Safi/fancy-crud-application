/**
 * Interface for defining the structure of product data for validation.
 */
interface productValidationType {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}

/**
 * Validates the product data based on specific criteria.
 * @param {productValidationType} product - The product data to be validated.
 * @returns {productValidationType} An object containing any errors in the product data, if any.
 *          If the product data is valid, it returns an object with empty strings for all fields.
 */
export const productValidation = (product: productValidationType): productValidationType => {
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

  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "Valid Price is required!";
  }

  return errors;
};
