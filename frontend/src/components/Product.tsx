import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { addProduct } from "../redux/slices/Cart";

interface ProductType {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface RootState {
  this: {
    isDarkMode: boolean;
  };
}

interface ProductProps {
  product: ProductType;
  isLast?: boolean;
  onLoadMore?: (node: HTMLDivElement) => void;
}

const Product = ({ product, isLast = false, onLoadMore }: ProductProps) => {
  const isDarkMode = useSelector((state: RootState) => state?.this?.isDarkMode);  
  const dispatch = useDispatch()
  const safeProduct = product || {
    id: 0,
    title: 'Product not available',
    description: 'No description',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: 'Unknown',
    category: 'unknown',
    thumbnail: '',
    images: []
  };

  const addToCart = (id:any) => {
    dispatch(addProduct(id));
  };  
  return (
    <motion.div
      className={`w-full rounded-xl shadow-lg border transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 text-white' 
          : 'bg-white border-gray-200 text-gray-900'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      ref={isLast && onLoadMore ? onLoadMore : undefined}
    >
      <div className="flex flex-col md:flex-row gap-6 p-6">
        <div className="flex-shrink-0 self-center">
          <img 
            src={safeProduct.thumbnail || safeProduct.images?.[0] || '/placeholder-image.jpg'} 
            alt={safeProduct.title}
            className="w-48 h-48 object-cover rounded-lg shadow-md"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
            }}
          />
        </div>

        <div className="flex-1 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-xl font-bold mb-2 line-clamp-2">
              {safeProduct.title}
            </h3>
            
            <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full capitalize">
              {safeProduct.category}
            </span>
          </div>

          <p className={`text-sm line-clamp-3 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {safeProduct.description}
          </p>

          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400 text-lg">
              {'★'.repeat(Math.floor(safeProduct.rating))}
              {'☆'.repeat(5 - Math.floor(safeProduct.rating))}
            </div>
            <span className={`text-sm font-medium ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {safeProduct.rating.toFixed(1)}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-green-600">
                ${safeProduct.price}
              </span>
              {safeProduct.discountPercentage > 0 && (
                <span className="text-sm line-through text-red-500">
                  ${(safeProduct.price / (1 - safeProduct.discountPercentage / 100)).toFixed(2)}
                </span>
              )}
            </div>

            <button
              onClick={() => addToCart(safeProduct)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className={`px-6 py-4 border-t ${
        isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'
      } rounded-b-xl`}>
        <div className="flex justify-between items-center text-sm">
          <span className={`px-3 py-1 rounded-full font-medium ${
            safeProduct.stock > 10 
              ? 'bg-green-100 text-green-800' 
              : safeProduct.stock > 0
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {safeProduct.stock > 10 
              ? `${safeProduct.stock} in stock` 
              : safeProduct.stock > 0
              ? `Only ${safeProduct.stock} left`
              : 'Out of stock'
            }
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Product;