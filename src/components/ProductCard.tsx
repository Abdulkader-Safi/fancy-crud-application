import { IProduct } from "../interfaces";
import { txtSlicer } from "../utils/functions";
import Image from "./Image";
import Button from "./ui/Button";
import CircleColor from "./ui/CircleColor";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  /* ------ RENDER ------ */
  const renderProductColors = product.colors.map((color) => <CircleColor key={color} color={color} />);

  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col space-y-3">
      <Image imageURL={product.imageURL} alt={"Product Name"} className="rounded-md h-52 w-full lg:object-cover" />

      <h3>{product.title}</h3>

      <p>{txtSlicer(product.description, 50)}</p>

      <div className="flex items-center flex-wrap my-4 space-x-2">
        {product.colors.length <= 0 ? <span className="w-5 h-5 bg-white rounded-full" /> : renderProductColors}
      </div>

      <div className="flex items-center justify-between">
        <span>${product.price}</span>
        <Image
          imageURL={product.category.imageURL}
          alt={product.category.name}
          className="w-10 h-10 rounded-full object-bottom"
        />
      </div>

      <div className="flex items-center justify-between space-x-1 mt-5">
        <Button className="bg-indigo-700 hover:bg-indigo-800">Edit</Button>
        <Button className="bg-red-700 hover:bg-red-800">Destroy</Button>
      </div>
    </div>
  );
};

export default ProductCard;
