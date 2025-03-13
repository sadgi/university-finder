import styles from "./FavouritesTable.module.css";

const FavouritesTable = ({ favourites, onRemove }) => (
  <table className={styles.favouritesTable}>
    <thead>
      <tr>
        <th>Name</th>
        <th>State/Province</th>
        <th>Website</th>
        <th>Remove</th>
      </tr>
    </thead>
    <tbody>
      {favourites.map((fav) => (
        <tr key={fav._id}>
          <td data-label="Name">{fav.name}</td>
          <td data-label="State/Province">{fav.state_province}</td>
          <td data-label="Website">
            <a href={fav.web_pages[0]} target="_blank" rel="noreferrer">
              Visit
            </a>
          </td>
          <td>
            <button onClick={() => onRemove(fav._id)}>Remove</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default FavouritesTable;
