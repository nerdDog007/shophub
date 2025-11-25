
import { motion } from "framer-motion";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

interface Product {
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
  quantity?: number;
}

interface CartProps {
  product: Product;
}

const Cart = ({ product }: CartProps) => {

  if (!product) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleRemove = () => {
  };

  const handleIncrement = () => {  };

  const handleDecrement = () => {
  };

  const totalPrice = (product.price * (product.quantity || 1)).toFixed(2);
  const discountPrice = product.discountPercentage > 0 
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row">
        <motion.div 
          className="flex-shrink-0 relative group"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img 
            src={product.thumbnail || product.images?.[0]} 
            alt={product.title}
            className="w-full md:w-48 h-48 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiIGZpbGw9IiNFOEU4RTgiLz48dGV4dCB4PSIxMjgiIHk9IjEyOCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5IiBkeT0iLjNlbSI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+';
            }}
          />
          {product.discountPercentage > 0 && (
            <motion.span 
              className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {product.discountPercentage}% OFF
            </motion.span>
          )}
        </motion.div>

        <div className="flex-1 p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div>
              <motion.h3 
                className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2"
                layout
              >
                {product.title}
              </motion.h3>
              <motion.p 
                className="text-blue-600 dark:text-blue-400 text-sm font-medium capitalize mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {product.category} • {product.brand}
              </motion.p>
            </div>

            <motion.p 
              className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {product.description}
            </motion.p>

            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex text-yellow-400">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({product.rating})
              </span>
            </motion.div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <motion.span 
                  className="text-2xl font-bold text-green-600"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  ${totalPrice}
                </motion.span>
                {discountPrice && (
                  <motion.span 
                    className="text-sm line-through text-red-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    ${discountPrice}
                  </motion.span>
                )}
                <motion.p 
                  className={`text-sm font-medium mt-1 ${
                    product.stock > 10 
                      ? 'text-green-600' 
                      : product.stock > 0 
                      ? 'text-yellow-600' 
                      : 'text-red-600'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {product.stock > 10 
                    ? `${product.stock} in stock` 
                    : product.stock > 0 
                    ? `Only ${product.stock} left` 
                    : 'Out of stock'
                  }
                </motion.p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <motion.div 
                className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  onClick={handleDecrement}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-600 dark:text-gray-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={!product.quantity || product.quantity <= 1}
                >
                  <FaMinus className="text-sm" />
                </motion.button>
                
                <motion.span 
                  className="font-bold text-lg min-w-8 text-center text-gray-900 dark:text-white"
                  key={product.quantity}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                >
                  {product.quantity || 1}
                </motion.span>
                
                <motion.button
                  onClick={handleIncrement}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-600 dark:text-gray-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={product.stock <= (product.quantity || 0)}
                >
                  <FaPlus className="text-sm" />
                </motion.button>
              </motion.div>

              <motion.button
                onClick={handleRemove}
                className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <FaTrash className="text-sm" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {product.stock <= 5 && product.stock > 0 && (
        <motion.div 
          className="bg-yellow-50 dark:bg-yellow-900/20 border-t border-yellow-200 dark:border-yellow-800 px-6 py-3"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <p className="text-yellow-800 dark:text-yellow-200 text-sm font-medium">
            low stcok Only {product.stock} left.
          </p>
        </motion.div>
      )}

      {product.stock === 0 && (
        <motion.div 
          className="bg-red-50 dark:bg-red-900/20 border-t border-red-200 dark:border-red-800 px-6 py-3"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <p className="text-red-800 dark:text-red-200 text-sm font-medium">
            Outof stock
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Cart;