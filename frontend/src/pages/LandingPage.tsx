import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { useEffect, useCallback, useRef, useState } from "react";
import { API_URL } from "../constants/utils";
import { setProducts, addProducts, setLoading, setError } from "../redux/slices/Product";
import Product from "../components/Product";

interface RootState {
  this: {
    isDarkMode: boolean;
  };
  product: {
    products: any[];
    loading: boolean;
    error: string | null;
    page: number;
    hasMore: boolean;
    selectedCategory: string;
    filterByPrice: string;
    search: string;
  };
}

const LandingPage = () => {
  const dispatch = useDispatch();
  
  const { isDarkMode } = useSelector((state: RootState) => state.this);
  
  const {
    products,
    filterByPrice,
    selectedCategory,
    search,
    hasMore,
    loading
  } = useSelector((state: RootState) => state.product);
  console.log(products);
  

  const [currentPage, setCurrentPage] = useState(1);

  const getProducts = useCallback(
    async (pageToFetch: number, reset = false) => {
      try {
        dispatch(setLoading(true));
  
        const limit = 10;
        let url = API_URL;
  
        if (search && search.trim() !== "") {
          url += "/search";
        } else if (selectedCategory !== "all") {
          url += `/category/${selectedCategory}`;
        }
  
        const params = new URLSearchParams();
        params.append("limit", limit.toString());
        params.append("skip", ((pageToFetch - 1) * limit).toString());
  
        if (search) params.append("q", search);
  
        url += `?${params.toString()}`;
  
        console.log("📦 Fetching from:", url);
  
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch products");
  
        const data = await response.json();
  
        let filteredProducts = data.products || [];
  
        if (filterByPrice === "low-to-high") {
          filteredProducts.sort((a:any, b:any) => a.price - b.price);
        } else if (filterByPrice === "high-to-low") {
          filteredProducts.sort((a:any, b:any) => b.price - a.price);
        } else if (filterByPrice === "rating") {
          filteredProducts.sort((a:any, b:any) => b.rating - a.rating);
        }
  
        if (reset) {
          dispatch(setProducts({ products: filteredProducts, total: data.total }));
        } else {
          dispatch(addProducts({ products: filteredProducts, total: data.total }));
        }
  
        setCurrentPage(pageToFetch + 1);
      } catch (err: any) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, selectedCategory, search, filterByPrice]
  );
  

  useEffect(() => {
    setCurrentPage(1);
    getProducts(1, true);
  }, [search, selectedCategory, filterByPrice]);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastProductRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          getProducts(currentPage);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, currentPage, getProducts]
  );

  return (
    <div
      className={`px-4 lg:px-8 min-h-screen ${
        isDarkMode ? "text-white bg-gray-900" : "text-black bg-white"
      } lg:w-[60%] mx-auto flex flex-col gap-6`}
    >
      <Header />

      {(search || selectedCategory !== "all" || filterByPrice !== "default") && (
        <div className="flex flex-wrap gap-2 mt-4">
          {search && (
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              Search: "{search}"
            </span>
          )}
          {selectedCategory !== "all" && (
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Category: {selectedCategory}
            </span>
          )}
          {filterByPrice !== "default" && (
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              Sort:{" "}
              {filterByPrice === "low-to-high"
                ? "Price: Low to High"
                : filterByPrice === "high-to-low"
                ? "Price: High to Low"
                : "Top Rated"}
            </span>
          )}
        </div>
      )}

      <div
        className={`flex justify-center my-6 flex-col gap-6 ${
          isDarkMode ? "text-white bg-gray-900" : "text-black bg-white"
        }`}
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            ref={index === products.length - 1 ? lastProductRef : null}
          >
            <Product product={product} />
          </div>
        ))}

        {!hasMore && products.length > 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            Youhave seen ll {products.length} products!
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
