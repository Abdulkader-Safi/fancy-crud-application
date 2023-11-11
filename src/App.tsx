import { ChangeEvent, FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuid } from "uuid";
import CircleColor from "./components/CircleColor";
import ErrorMessage from "./components/ErrorMessage";
import ProductCard from "./components/ProductCard";
import Button from "./components/ui/Button";
import Model from "./components/ui/Model";
import Select from "./components/ui/Select";
import Input from "./components/ui/input";
import { categories, colors, formInputsList, productList } from "./data";
import { ICategory, IProduct } from "./interfaces";
import { ProductNameTypes } from "./types";
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
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProductObj);
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<ICategory>(categories[0]);
  const [errorsMsgs, setErrorsMsgs] = useState(errorsMsg);
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [isOpenCreateProductModel, setIsOpenCreateProductModel] = useState(false);
  const [isOpenEditProductModel, setIsOpenEditProductModel] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  /* ------ HANDLER ------ */
  const openCreateProductModel = () => setIsOpenCreateProductModel(true);
  const closeCreateProductModel = () => setIsOpenCreateProductModel(false);
  const openEditProductModel = () => setIsOpenEditProductModel(true);
  const closeEditProductModel = () => setIsOpenEditProductModel(false);
  const openDeleteProductModel = () => setIsOpenConfirmModal(true);
  const closeDeleteProductModel = () => setIsOpenConfirmModal(false);

  const onChangeCreateProductHandler = (e: ChangeEvent<HTMLInputElement>) => {
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

  const onChangeEditProductHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });

    setErrorsMsgs({
      ...errorsMsgs,
      [name]: "",
    });
  };

  const onCancelCreateProductModel = () => {
    closeCreateProductModel();
    setProduct(defaultProductObj);
    setErrorsMsgs(errorsMsg);
    setTempColors([]);
    setSelectedCategory(categories[0]);
    setProductToEdit(defaultProductObj);
  };

  const submitCreateProductHandler = (e: FormEvent<HTMLFormElement>): void => {
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

    // console.log("Send this product to out server");
    setProducts((prev) => [{ ...product, id: uuid(), colors: tempColors, category: selectedCategory }, ...prev]);
    onCancelCreateProductModel();

    toast("Product has been added successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  };

  const submitEditProductHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { title, description, price, imageURL } = productToEdit;

    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
    });

    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") && Object.values(errors).every((value) => value === "");

    if (!hasErrorMsg) {
      setErrorsMsgs(errors);
      return;
    }

    const updatedProducts = [...products];
    updatedProducts[productToEditIdx] = { ...productToEdit, colors: tempColors.concat(productToEdit.colors) };
    setProducts(updatedProducts);

    setProductToEdit(defaultProductObj);
    setTempColors([]);
    closeEditProductModel();

    toast("Product has been updated successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  };

  const submitRemoveProductHandler = () => {
    const filtered = products.filter((product) => product.id !== productToEdit.id);
    setProducts(filtered);
    closeDeleteProductModel();
    toast("Product has been deleted successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "#c2344d",
        color: "white",
      },
    });
  };

  /* ------ RENDER ------ */
  const renderProductList = products.map((product, idx) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      idx={idx}
      setProductToEditIdx={setProductToEditIdx}
      openEditProductModel={openEditProductModel}
      openDeleteProductModel={openDeleteProductModel}
    />
  ));
  const renderFormInputList = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label htmlFor={input.id} className="mb-[2px] text-sm font-medium text-gray-700">
        {input.label}
      </label>
      <Input
        id={input.id}
        type="text"
        name={input.name}
        value={product[input.name]}
        onChange={onChangeCreateProductHandler}
      />
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
  const renderProductEditWithErrorMsg = (id: string, label: string, name: ProductNameTypes) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="mb-[2px] text-sm font-medium text-gray-700">
          {label}
        </label>
        <Input type="text" id={id} name={name} value={productToEdit[name]} onChange={onChangeEditProductHandler} />
        <ErrorMessage msg={errorsMsgs[name]} />
      </div>
    );
  };

  return (
    <main className="container w-2x">
      <Button className="bg-indigo-700 hover:bg-indigo-800" onClick={openCreateProductModel}>
        Add
      </Button>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-4 p-2 rounded-md">
        {renderProductList}
      </div>
      {/* Create Product Model */}
      <Model isOpen={isOpenCreateProductModel} closeModel={closeCreateProductModel} title="ADD A NEW PRODUCT">
        <form className="space-y-2" onSubmit={submitCreateProductHandler}>
          {renderFormInputList}

          <Select selected={selectedCategory} setSelected={(category: ICategory) => setSelectedCategory(category)} />

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
            <Button type="button" className="bg-gray-400 hover:bg-gray-500" onClick={onCancelCreateProductModel}>
              Cancel
            </Button>
          </div>
        </form>
      </Model>
      {/* Edit Product Model */}
      <Model isOpen={isOpenEditProductModel} closeModel={closeEditProductModel} title={`Edit ${productToEdit.title}`}>
        <form className="space-y-2" onSubmit={submitEditProductHandler}>
          {renderProductEditWithErrorMsg("title", "Product Title", "title")}
          {renderProductEditWithErrorMsg("description", "Product Description", "description")}
          {renderProductEditWithErrorMsg("imageURL", "Product Image URL", "imageURL")}
          {renderProductEditWithErrorMsg("price", "Product Price", "price")}

          <Select
            selected={productToEdit.category}
            setSelected={(value) => setProductToEdit({ ...productToEdit, category: value })}
          />

          <div className="flex items-center flex-wrap space-x-1">{renderProductColors}</div>
          <div className="flex items-center flex-wrap space-x-1">
            {tempColors.concat(productToEdit.colors).map((color) => (
              <span
                key={color}
                className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between space-x-3 mt-5">
            <Button type="submit" className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button type="button" className="bg-gray-400 hover:bg-gray-500" onClick={closeEditProductModel}>
              Cancel
            </Button>
          </div>
        </form>
      </Model>

      {/* DELETE PRODUCT CONFIRM MODAL */}
      <Model
        isOpen={isOpenConfirmModal}
        closeModel={closeDeleteProductModel}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button className="bg-[#c2344d] hover:bg-red-800" onClick={submitRemoveProductHandler}>
            Yes, remove
          </Button>
          <Button
            type="button"
            className="bg-[#f5f5fa] hover:bg-gray-300 !text-black"
            onClick={closeDeleteProductModel}
          >
            Cancel
          </Button>
        </div>
      </Model>

      <Toaster />
    </main>
  );
}

export default App;
