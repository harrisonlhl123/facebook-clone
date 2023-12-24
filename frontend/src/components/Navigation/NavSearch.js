import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSearchResults, fetchSearchResults } from "../../store/search";
import { useHistory } from "react-router-dom";
import "./NavSearch.css";

function NavSearch() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const history = useHistory();
  const searchResults = useSelector((state) => Object.values(state.search));

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchText(query);

    if (query.trim() !== "") {
      dispatch(fetchSearchResults(query));
    } else {
      dispatch(clearSearchResults());
    }
  };

  const handleClick = (id) => {
    return (e) => {
      e.preventDefault();
      history.push(`/users/${id}`);
      dispatch(clearSearchResults());
      setSearchText("");
    };
  };

  const dropDown = () => {
    if (searchText === "") {
      // return <p>Wow, such empty!</p>;
    } else if (searchResults.length === 0) {
      return <p>No results found.</p>;
    } else {
      return (
        <ul>
          {searchResults
            ? searchResults.map((result) => (
                <li onClick={handleClick(result.id)} key={result.id}>
                  <div>
                    <img id="userIcon" alt="" src={result?.pfp}></img>
                    <p>
                      {result.firstName} {result.lastName}
                    </p>
                  </div>
                </li>
              ))
            : ""}
        </ul>
      );
    }
  };

  return (
    <div>
      <input
        id="userSearch"
        placeholder="Search Instabook"
        type="text"
        value={searchText}
        onChange={handleChange}
      />

      <div className="search-dropdown">{dropDown()}</div>
    </div>
  );
}

export default NavSearch;
