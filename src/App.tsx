import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import Button from "./components/ui/Button";
import Model from "./components/ui/Model";
import Input from "./components/ui/input";
import { formInputsList, productList } from "./data";
import { IProduct } from "./interfaces";

function App() {
  const defaultProductObj: IProduct = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };

  /* ------ STATE ------ */
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [isOpen, setIsOpen] = useState(false);

  /* ------ HANDLER ------ */
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setProduct({
      ...product,
      [name]: value,
    });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(product);
  };

  const onCancel = () => {
    closeModal();
    setProduct(defaultProductObj);
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
        <form className="space-y-2" onSubmit={submitHandler}>
          {renderFormInputList}
          <div className="flex items-center justify-between space-x-3 mt-5">
            <Button type="submit" className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button type="button" className="bg-gray-400 hover:bg-gray-500" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Model>
    </main>
  );
}

export default App;
