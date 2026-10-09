import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";
  const search = searchParams.get("search") || "";

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = products
    .filter((product) =>
      category ? product.category === category : true
    )
    .filter((product) =>
      search
        ? product.title.toLowerCase().includes(search.toLowerCase())
        : true
    )
    .sort((a, b) => {
      if (sort === "price") {
        return a.price - b.price;
      }

      return 0;
    });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Products</h1>

      <div>
        <label>
          Category:{" "}
          <select
            value={category}
            onChange={(event) => {
              const value = event.target.value;
              setSearchParams((params) => {
                if (value) {
                  params.set("category", value);
                } else {
                  params.delete("category");
                }

                return params;
              });
            }}
          >
            <option value="">All categories</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's clothing</option>
            <option value="women's clothing">Women's clothing</option>
          </select>
        </label>

        <label>
          Sort:{" "}
          <select
            value={sort}
            onChange={(event) => {
              const value = event.target.value;
              setSearchParams((params) => {
                if (value) {
                  params.set("sort", value);
                } else {
                  params.delete("sort");
                }

                return params;
              });
            }}
          >
            <option value="">Default</option>
            <option value="price">Price: low to high</option>
          </select>
        </label>

        <label>
          Search:{" "}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(event) => {
              const value = event.target.value;
              setSearchParams((params) => {
                if (value) {
                  params.set("search", value);
                } else {
                  params.delete("search");
                }

                return params;
              });
            }}
          />
        </label>
      </div>

      <div className="products-list">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p>No products found.</p>
      )}
    </div>
  );
}

export default Products;