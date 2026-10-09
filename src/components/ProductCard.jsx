import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.title}
      />

      <h3>{product.title}</h3>

      <p>Price: ${product.price}</p>

      <Link to={`/products/${product.id}`}>
        View details
      </Link>
    </div>
  );
}

export default ProductCard;