import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar/SearchBar";
import UniversityTable from "../components/UniversityTable/UniversityTable";
import Loader from "../components/Loader/Loader";
import Layout from "../components/Layout/Layout";

const Home = () => {
  const [universities, setUniversities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [searchParams, setSearchParams] = useState({
    country: "Canada",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [favourites, setFavourites] = useState([]);

  const fetchUniversitiesAndCountries = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/api/universities`
      );
      setCountries(response.data.countries);
      fetchUniversities({ country: "Canada", name: "" });
    } catch (error) {
      console.error("Error fetching universities and countries:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUniversities = async (searchParams) => {
    const { country, name } = searchParams;
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/api/universities?country=${country}&name=${name}`
      );
      setUniversities(response.data.universities);
      setSearchParams({ country, name });
    } catch (error) {
      console.error("Error fetching filtered universities:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavourites = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/favourites`);
      setFavourites(response.data);
    } catch (error) {
      console.error("Error fetching favourites:", error);
    }
  };

  const addFavourite = async (university) => {
    const isFavourite = favourites.some((fav) => fav._id === university._id);

    try {
      if (isFavourite) {
        await axios.delete(
          `http://localhost:3001/api/favourites/${university._id}`
        );
      } else {
        await axios.post(`http://localhost:3001/api/favourites`, {
          university,
        });
      }
      fetchFavourites();
      fetchUniversities(searchParams);
    } catch (error) {
      console.error("Error toggling favourite status:", error);
    }
  };

  useEffect(() => {
    fetchUniversitiesAndCountries();
    fetchFavourites();
  }, []);

  return (
    <Layout title="University App">
      <SearchBar onSearch={fetchUniversities} countries={countries} />
      {loading ? (
        <Loader />
      ) : (
        <UniversityTable
          universities={universities}
          onFavourite={addFavourite}
          favourites={favourites}
        />
      )}
    </Layout>
  );
};

export default Home;
