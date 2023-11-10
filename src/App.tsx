import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import Button from "./components/ui/Button";
import CircleColor from "./components/ui/CircleColor";
import ErrorMessage from "./components/ui/ErrorMessage";
import Model from "./components/ui/Model";
import Input from "./components/ui/input";
import { colors, formInputsList, productList } from "./data";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";

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

  const errorsMsg = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  /* ------ STATE ------ */
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [errorsMsgs, setErrorsMsgs] = useState(errorsMsg);
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  console.log(tempColors);

  /* ------ HANDLER ------ */
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setProduct({
      ...product,
      [name]: value,
    });

    setErrorsMsgs({
      ...errorsMsgs,
      [name]: "",
    });
  };

  const onCancel = () => {
    closeModal();
    setProduct(defaultProductObj);
    setErrorsMsgs(errorsMsg);
    setTempColors([]);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { title, description, imageURL, price } = product;
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });

    setErrorsMsgs(errors);

    const hasErrorMsg: boolean =
      Object.values(errors).some((value) => value === "") && Object.values(errors).every((value) => value === "");
    if (!hasErrorMsg) {
      return;
    }

    console.log("Send this product to out server");
  };

  /* ------ RENDER ------ */
  const renderProductList = productList.map((product) => <ProductCard key={product.id} product={product} />);
  const renderFormInputList = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label htmlFor={input.id} className="mb-[2px] text-sm font-medium text-gray-700">
        {input.label}
      </label>
      <Input id={input.id} type="text" name={input.name} value={product[input.name]} onChange={onChangeHandler} />
      <ErrorMessage msg={errorsMsgs[input.name]} />
    </div>
  ));
  const renderProductColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColors((prev) => [...prev, color]);
      }}
    />
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

          <div className="flex items-center flex-wrap space-x-1">
            {tempColors.map((color) => (
              <span
                key={color}
                className="p-1 mr-1 mb-1 text-xs rounded-md text-white cursor-pointer"
                style={{ backgroundColor: color }}
                onClick={() => {
                  if (tempColors.includes(color)) {
                    setTempColors((prev) => prev.filter((item) => item !== color));
                  }
                }}
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex items-center flex-wrap space-x-1">{renderProductColors}</div>

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
