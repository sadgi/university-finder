import styles from "./UniversityTable.module.css";

const UniversityTable = ({ universities, onFavourite }) => {
  return (
    <table className={styles.universityTable}>
      <thead>
        <tr>
          <th>Name</th>
          <th>State/Province</th>
          <th>Website</th>
          <th>Favourite</th>
        </tr>
      </thead>
      <tbody>
        {universities.map((uni) => (
          <tr key={uni._id}>
            <td data-label="Name">{uni.name}</td>
            <td data-label="State/Province">{uni.state_province}</td>
            <td data-label="Website">
              <a href={uni.web_pages[0]} target="_blank" rel="noreferrer">
                Visit
              </a>
            </td>
            <td>
              <button
                className={`${styles.favouriteButton} ${
                  uni.isFavourite ? styles.removeFavourite : styles.addFavourite
                }`}
                onClick={() => onFavourite(uni)}
              >
                {uni.isFavourite ? "Remove Favourite" : "Add Favourite"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UniversityTable;
