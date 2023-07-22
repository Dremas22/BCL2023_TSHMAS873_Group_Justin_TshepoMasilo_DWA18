// import React from 'react'

// const User = () => {
//   const [favorites, setFavorites] = React.useState([]);
//   const [newFavorite, setNewFavorite] = React.useState('');

//   const handleAddFavorite = () => {
//     if (newFavorite.trim() === '') return;

//     // Check if the newFavorite already exists in the favorites list
//     if (!favorites.includes(newFavorite)) {
//       setFavorites([...favorites, newFavorite]);
//       setNewFavorite('');
//     }
//   };

//   const handleRemoveFavorite = (favorite) => {
//     const updatedFavorites = favorites.filter((item) => item !== favorite);
//     setFavorites(updatedFavorites);
//   };

//   return (
//     <div>
//       <h2 className='h2-favourites'>User Favorites</h2>
//       <div className='add-favorites'>
//         <input
//           type="text"
//           className="input-favours"
//           value={newFavorite}
//           onChange={(e) => setNewFavorite(e.target.value)}
//           placeholder="Enter favorite item"
//         />
//         <button onClick={handleAddFavorite} className='btn-favours'>Add Favorite</button>
//       </div>
      
//         <ul className='ul-favours'>
//           {favorites.map((favorite, index) => (
//             <li key={index} className='li-favours'>
//               {favorite}{' '}
//               <button onClick={() => handleRemoveFavorite(favorite)} className='btn-favours'>
//                 Remove
//               </button>
//             </li>
//           ))}
//         </ul>
      
//     </div>
//   );
// };

// export default User;

import React from 'react';

const User = () => {
  const [favorites, setFavorites] = React.useState([]);
  const [newFavorite, setNewFavorite] = React.useState('');
  const [sortingType, setSortingType] = React.useState('name'); // 'name' or 'date'
  const [sortingOrder, setSortingOrder] = React.useState('ascending'); // 'ascending' or 'descending'

  const handleAddFavorite = () => {
    if (newFavorite.trim() === '') return;

    // Check if the newFavorite already exists in the favorites list
    if (!favorites.some((fav) => fav.name === newFavorite)) {
      const newFav = {
        name: newFavorite,
        date: new Date().toISOString(), // Store the date as a string in ISO format
      };
      setFavorites([...favorites, newFav]);
      setNewFavorite('');
    }
  };

  const handleRemoveFavorite = (favorite) => {
    const updatedFavorites = favorites.filter((item) => item.name !== favorite.name);
    setFavorites(updatedFavorites);
  };

  const handleSortingTypeChange = (e) => {
    setSortingType(e.target.value);
  };

  const handleSortingOrderChange = (e) => {
    setSortingOrder(e.target.value);
  };

  const formatDate = (date) => {
    // Parse the ISO date string back to a Date object
    const parsedDate = new Date(date);
    // Format the date to a simple readable format (e.g., "YYYY-MM-DD HH:MM")
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    const hours = String(parsedDate.getHours()).padStart(2, '0');
    const minutes = String(parsedDate.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const sortedFavorites = favorites.slice().sort((a, b) => {
    if (sortingType === 'name') {
      if (sortingOrder === 'ascending') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    } else {
      if (sortingOrder === 'ascending') {
        return a.date.localeCompare(b.date);
      } else {
        return b.date.localeCompare(a.date);
      }
    }
  });

  return (
    <div>
      <h2 className="h2-favourites">User Favorites</h2>
      <div className="add-favorites">
        <input
          type="text"
          className="input-favours"
          value={newFavorite}
          onChange={(e) => setNewFavorite(e.target.value)}
          placeholder="Enter favorite item"
        />
        <button onClick={handleAddFavorite} className="btn-favours">
          Add Favorite
        </button>
      </div>

      <div>
        <label htmlFor="sortingType">Sort by:</label>
        <select
          id="sortingType"
          name="sortingType"
          value={sortingType}
          onChange={handleSortingTypeChange}
        >
          <option value="name">Name</option>
          <option value="date">Date</option>
        </select>

        <label htmlFor="sortingOrder">Order:</label>
        <select
          id="sortingOrder"
          name="sortingOrder"
          value={sortingOrder}
          onChange={handleSortingOrderChange}
        >
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>

      <ul className="ul-favours">
        {sortedFavorites.map((favorite, index) => (
          <li key={index} className="li-favours">
            {favorite.name} (Added on {formatDate(favorite.date)}){' '}
            <button onClick={() => handleRemoveFavorite(favorite)} className="btn-favours">
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;