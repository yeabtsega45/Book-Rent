import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import PropTypes from "prop-types";
import { MenuItem } from "@mui/material";

const StyledAutocomplete = styled(Autocomplete)({
  "& .MuiOutlinedInput-root": {
    paddingTop: "8px",
    paddingBottom: "8px",
  },
});

const StyledPaper = styled(Paper)(() => ({
  marginTop: "-8px",
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
}));

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

function SearchBook({ setParentData }) {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [books, setBooks] = useState([
    { id: 1, title: "Book 1", author: "F. Scott Fitzgerald" },
    { id: 2, title: "Book 2", author: "Harper Lee" },
  ]);
  const [open, setOpen] = useState(false);
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookAuthor, setNewBookAuthor] = useState("");
  const [newBookCategory, setNewBookCategory] = useState("");

  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => setOpen(false);

  const handleAddBook = () => {
    const newBook = {
      id: books.length + 1,
      title: newBookTitle,
      author: newBookAuthor,
      category: newBookCategory,
    };
    setBooks([...books, newBook]);
    setParentData((prevData) => ({
      ...prevData,
      title: newBook.title,
      author: newBook.author,
      category: newBook.category,
    }));
    setValue(newBook); // Set the newly added book as the selected value
    setInputValue(newBook.title); // Set the input value to the new book's title
    setNewBookTitle("");
    setNewBookAuthor("");
    setNewBookCategory("");
    handleCloseModal();
  };

  return (
    <Box width="100%" maxWidth={360}>
      <StyledAutocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          if (newValue) {
            setParentData((prevData) => ({
              ...prevData,
              title: newValue.title,
              author: newValue.author,
              category: newValue.category,
            }));
            setInputValue(newValue.title); // Set input value to the title of the selected book
          }
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="select-demo"
        options={books}
        getOptionLabel={(option) => option.title || ""} // Ensure getOptionLabel returns a string
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search book by name or Author"
            placeholder="Search..."
            variant="outlined"
            sx={{ backgroundColor: "#0000000F" }}
          />
        )}
        fullWidth
      />
      <StyledPaper elevation={8}>
        <Box sx={{ p: 2 }}>
          <Button color="primary" variant="text" onClick={handleOpenModal}>
            Add
          </Button>
        </Box>
      </StyledPaper>

      <Modal open={open} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Book
          </Typography>
          <TextField
            fullWidth
            label="Book Title"
            value={newBookTitle}
            onChange={(e) => setNewBookTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Author"
            value={newBookAuthor}
            onChange={(e) => setNewBookAuthor(e.target.value)}
            margin="normal"
          />
          <TextField
            select
            fullWidth
            label="Category"
            value={newBookCategory}
            onChange={(e) => setNewBookCategory(e.target.value)}
            margin="normal"
          >
            <MenuItem value="fiction">Fiction</MenuItem>
            <MenuItem value="self help">Self Help</MenuItem>
            <MenuItem value="business">Business</MenuItem>
          </TextField>
          <Button variant="contained" onClick={handleAddBook} sx={{ mt: 2 }}>
            Add Book
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

SearchBook.propTypes = {
  setParentData: PropTypes.func.isRequired,
};

export default SearchBook;
