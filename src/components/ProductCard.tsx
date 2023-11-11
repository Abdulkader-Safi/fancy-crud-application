import { IProduct } from "../interfaces";
import { txtSlicer } from "../utils/functions";
import CircleColor from "./CircleColor";
import Image from "./Image";
import Button from "./ui/Button";

interface IProps {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openEditProductModel: () => void;
  idx: number;
  setProductToEditIdx: (value: number) => void;
  openDeleteProductModel: () => void;
}

const ProductCard = ({
  product,
  setProductToEdit,
  openEditProductModel,
  idx,
  setProductToEditIdx,
  openDeleteProductModel,
}: IProps) => {
  /* ------ RENDER ------ */
  const renderProductColors = product.colors.map((color) => <CircleColor key={color} color={color} />);

  /* ------ HANDLER ------ */
  const onEdit = () => {
    setProductToEdit(product);
    openEditProductModel();
    setProductToEditIdx(idx);
  };

  const onRemove = () => {
    setProductToEdit(product);
    openDeleteProductModel();
  };

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
        <Button className="bg-indigo-700 hover:bg-indigo-800" onClick={onEdit}>
          Edit
        </Button>
        <Button className="bg-red-700 hover:bg-red-800" onClick={onRemove}>
          Destroy
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
