import { IProduct } from "../interfaces";
import { txtSlicer } from "../utils/functions";
import Image from "./Image";
import Button from "./ui/Button";

interface IProps {
  product: IProduct;
}

// eslint-disable-next-line no-empty-pattern
const ProductCard = ({ product }: IProps) => (
  <div className="border rounded-md p-2 flex flex-col">
    <Image imageURL={product.imageURL} alt={product.title} className="rounded-md mb-2" />

    <h3>{product.title}</h3>

    <p>{txtSlicer(product.description, 50)}</p>

    <div className="flex items-center my-4 space-x-2">
      <span className="w-5 h-5 bg-indigo-300 rounded-full cursor-pointer" />
      <span className="w-5 h-5 bg-blue-300 rounded-full cursor-pointer" />
      <span className="w-5 h-5 bg-yellow-300 rounded-full cursor-pointer" />
      <span className="w-5 h-5 bg-red-300 rounded-full cursor-pointer" />
    </div>

    <div className="flex items-center justify-between">
      <span>${product.price}</span>
      <Image imageURL={product.imageURL} alt={product.title} className="w-10 h-10 rounded-full object-bottom" />
    </div>

    <div className="flex items-center justify-between space-x-1 mt-5">
      <Button className="bg-indigo-700">Edit</Button>
      <Button className="bg-red-700">Destroy</Button>
    </div>
  </div>
);

export default ProductCard;
