import Image from "./Image";

interface IProps {}

// eslint-disable-next-line no-empty-pattern
const ProductCard = ({}: IProps) => {
  return (
    <div className="border rounded-md p-2 flex flex-col">
      <Image
        imageURL="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=1744&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Product Name"
        className="rounded-md mb-2"
      />

      <h3>Blue BMW</h3>

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde consectetur ex quis, recusandae aspernatur autem
      </p>

      <div className="flex items-center my-4 space-x-2">
        <span className="w-5 h-5 bg-indigo-300 rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-blue-300 rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-yellow-300 rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-red-300 rounded-full cursor-pointer" />
      </div>

      <div className="flex items-center justify-between">
        <span>$500,000</span>
        <Image
          imageURL="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=1744&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Product Name"
          className="w-10 h-10 rounded-full object-bottom"
        />
      </div>

      <div className="flex items-center justify-between space-x-1 mt-5">
        <button type="submit" className="bg-indigo-700 p-2 flex-1 rounded-md text-white">
          Edit
        </button>
        <button type="submit" className="bg-red-700 p-2 flex-1 rounded-md text-white">
          Destroy
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
