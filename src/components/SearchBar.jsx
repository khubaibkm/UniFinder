import PropTypes from "prop-types";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const SearchBar = ({ onChange }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Search..."
        onChange={onChange}
        style={{
          width: "100%",
          maxWidth: "350px",
          marginTop: "30px",
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;
