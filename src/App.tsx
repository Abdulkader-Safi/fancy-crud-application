import { ChangeEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import Button from "./components/ui/Button";
import Model from "./components/ui/Model";
import Input from "./components/ui/input";
import { formInputsList, productList } from "./data";
import { IProduct } from "./interfaces";

function App() {
  /* ------ STATE ------ */
  const [product, setProduct] = useState<IProduct>({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  /* ------ HANDLER ------ */
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setProduct({
      ...product,
      [name]: value,
    });
  };

  /* ------ RENDER ------ */
  const renderProductList = productList.map((product) => <ProductCard key={product.id} product={product} />);
  const renderFormInputList = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label htmlFor={input.id} className="mb-[2px] text-sm font-medium text-gray-700">
        {input.label}
      </label>
      <Input id={input.id} type="text" name={input.name} value={product[input.name]} onChange={onChangeHandler} />
    </div>
  ));

  return (
    <main className="container w-2x">
      <Button className="bg-indigo-700 hover:bg-indigo-800" onClick={openModal}>
        Add
      </Button>

      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-4 p-2 rounded-md">
        {renderProductList}
      </div>

      <Model isOpen={isOpen} closeModel={closeModal} title="ADD A NEW PRODUCT">
        <div className="space-y-2">
          {renderFormInputList}{" "}
          <form className="flex items-center justify-between space-x-3 mt-5">
            <Button className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
            <Button className="bg-gray-400 hover:bg-gray-500" onClick={closeModal}>
              Cancel
            </Button>
          </form>
        </div>
      </Model>
    </main>
  );
}

export default App;
