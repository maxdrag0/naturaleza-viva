import ItemListContainer from "../../components/ItemListContainer/ItemListContainer";
import { PuffLoader } from "react-spinners";
import { useProducts } from "../../hooks/useProducts";
import "./Home.css";
import InicializarBaseDeDatos from "../../components/InicializarBaseDeDatos";

function Home() {
  const { items, loading } = useProducts();

  return (
    <>
      <div className="container-home">
        <h1 style={{ marginTop: "10px" }}>Bienvenido a la tienda!</h1>
        {loading ? (
          <PuffLoader></PuffLoader>
        ) : (
          <ItemListContainer items={items} />
        )}

        {/* <InicializarBaseDeDatos /> */}
      </div>
    </>
  );
}

export default Home;
