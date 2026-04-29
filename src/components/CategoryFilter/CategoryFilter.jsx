import { Link } from "react-router-dom";
import { CATEGORIES } from "../../constants/categories";
import "./CategoryFilter.css";

const categoryValues = Object.values(CATEGORIES);

function CategoryFilter({ activeCategory }) {
  return (
    <div className="category-filter">
      <h3>Categorías</h3>
      <ul className="category-list">
        <li>
          <Link
            to="/products"
            className={`category-link ${!activeCategory ? "active" : ""}`}
          >
            Todos los productos
          </Link>
        </li>
        {categoryValues.map((category) => (
          <li key={category}>
            <Link
              to={`/products/${category}`}
              className={`category-link ${
                activeCategory === category ? "active" : ""
              }`}
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryFilter;
