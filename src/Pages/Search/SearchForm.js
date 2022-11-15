import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import { GiMilkCarton, GiPeanut, GiShrimp, GiJellyBeans } from 'react-icons/gi';
import { TbCheese, TbEgg } from "react-icons/tb";
import { CiWheat } from "react-icons/ci";
import { IoFishOutline } from "react-icons/io5";

const SearchForm = () => {
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Dairy = (
    <Box
      sx={{
        display: "flex",
        gap: 1,
      }}
    >
      <Typography>Dairy</Typography>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <GiMilkCarton fontSize="big" />
        <TbCheese />
      </Box>
    </Box>
  );
  const Egg = (
    <Box
      sx={{
        display: "flex",
        gap: 1,
      }}
    >
      <Typography>Egg</Typography>
      <TbEgg />
    </Box>
  );
  const Gluten = (
    <Box
      sx={{
        display: "flex",
        gap: 1,
      }}
    >
      <Typography>Gluten</Typography>
      <CiWheat />
    </Box>
  );
  const Peanut = (
    <Box
      sx={{
        display: "flex",
        gap: 1,
      }}
    >
      <Typography>Peanut</Typography>
      <GiPeanut />
    </Box>
  );
  const Seafood = (
    <Box
      sx={{
        display: "flex",
        gap: 1,
      }}
    >
      <Typography>Seafood</Typography>
      <IoFishOutline />
    </Box>
  );
  const Shellfish = (
    <Box
      sx={{
        display: "flex",
        gap: 1,
      }}
    >
      <Typography>Shellfish</Typography>
      <GiShrimp />
    </Box>
  );
  const Soy = (
    <Box
      sx={{
        display: "flex",
        gap: 1,
      }}
    >
      <Typography>Soy</Typography>
      <GiJellyBeans />
    </Box>
  );

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        New Recipe Search
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Search</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To search a new recipe, please fill the form
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Ingredients"
            type="text"
            fullWidth
            variant="filled"
          />
          <DialogContentText>
            Intolerances:
          </DialogContentText>
          <FormGroup>
          <FormControlLabel control={<Checkbox />} label={Dairy} />
                <FormControlLabel control={<Checkbox />} label={Egg} />
                <FormControlLabel control={<Checkbox />} label={Gluten} />
                <FormControlLabel control={<Checkbox />} label={Peanut} />
                <FormControlLabel control={<Checkbox />} label={Seafood} />
                <FormControlLabel control={<Checkbox />} label={Shellfish} />
                <FormControlLabel control={<Checkbox />} label={Soy} />
            </FormGroup>
              
        </DialogContent>
        <DialogActions>
          <Button>Cancel</Button>
          <Button>Search</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

};

export default SearchForm;
