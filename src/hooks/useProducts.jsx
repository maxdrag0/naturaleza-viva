import { useEffect, useState, useCallback } from "react";
import { services } from "../services/index.js";

const useProducts = (category) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { items: newItems, lastVisibleDoc } = await services.firebase.obtenerProductos(category, null);
      setItems(newItems);
      setLastVisible(lastVisibleDoc);
      setHasMore(newItems.length > 0 && lastVisibleDoc !== undefined);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [category]);

  const loadMore = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const { items: moreItems, lastVisibleDoc } = await services.firebase.obtenerProductos(category, lastVisible);
      setItems((prev) => [...prev, ...moreItems]);
      setLastVisible(lastVisibleDoc);
      setHasMore(moreItems.length > 0 && lastVisibleDoc !== undefined);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [load]);

  return { items, loading, error, refetch: load, setItems, loadMore, hasMore };
};

export { useProducts };
