import { PuffLoader } from "react-spinners";
import ItemListContainer from "../../components/ItemListContainer/ItemListContainer";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import { useProducts } from "../../hooks/useProducts";
import "./Products.css";
import { useParams } from "react-router-dom";

function Products() {
  const { category } = useParams();
  const { items, loading, loadMore, hasMore } = useProducts(category);

  return (
    <div className="product-page">
      <CategoryFilter activeCategory={category} />
      
      <div className="product-content">
        {loading && items.length === 0 ? (
          <div className="loader-container">
            <PuffLoader color="#13327f" size={60} />
          </div>
        ) : (
          <>
            <div className="product-header">
              {category ? <h1>{category}</h1> : <h1>Todos los productos</h1>}
              <p className="product-count">{items.length} productos encontrados</p>
            </div>
            <ItemListContainer items={items} />
            
            {hasMore && (
              <div className="load-more-container" style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button 
                  onClick={loadMore} 
                  disabled={loading}
                  className="auth-btn"
                  style={{ width: 'auto', padding: '10px 30px' }}
                >
                  {loading ? "Cargando..." : "Cargar más"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Products;
