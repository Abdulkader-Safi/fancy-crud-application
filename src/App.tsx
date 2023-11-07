import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Button from "./components/ui/Button";
import Model from "./components/ui/Model";
import { productList } from "./data";

function App() {
  /* ------ STATE ------ */
  const [isOpen, setIsOpen] = useState(false);

  /* ------ HANDLER ------ */
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  /* ------ RENDER ------ */
  const renderProductList = productList.map((product) => <ProductCard key={product.id} product={product} />);

  return (
    <main className="container w-2x">
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-4 p-2 rounded-md">
        {renderProductList}
      </div>

      <Model isOpen={isOpen} closeModel={closeModal} title="ADD A NEW PRODUCT">
        <div className="flex items-center justify-between space-x-3 mt-5">
          <Button className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
          <Button className="bg-gray-300 hover:bg-gray-400">Cancel</Button>
        </div>
      </Model>
    </main>
  );
}

export default App;
