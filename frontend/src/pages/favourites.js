import { useState, useEffect } from "react";
import axios from "axios";
import FavouritesTable from "../components/FavouriteTable/FavouritesTable";
import Loader from "../components/Loader/Loader";
import Layout from "../components/Layout/Layout";

const FavouritesPage = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavourites = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3001/api/favourites"
        );
        setFavourites(response.data);
      } catch (error) {
        console.error("Error fetching favourites:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavourites();
  }, []);

  const removeFavourite = async (id) => {
    await axios.delete(`http://localhost:3001/api/favourites/${id}`);
    setFavourites(favourites.filter((fav) => fav._id !== id));
  };

  return (
    <Layout title="Favourites">
      {loading ? (
        <Loader />
      ) : (
        <FavouritesTable favourites={favourites} onRemove={removeFavourite} />
      )}
    </Layout>
  );
};

export default FavouritesPage;
