import Item from "../Item/Item";
import "./ItemList.css";

function ItemList({ items }) {
  return (
    <>
      {items.map((item) => (
        <Item key={item.codigo} item={item} />
      ))}
    </>
  );
}

export default ItemList;
