import logo from './logo.svg';
import './App.css';
import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import { display } from '@mui/system';
const apiURL = `https://movie-list-node-api.herokuapp.com/`

function App() {
  const [movies, setMovies] = React.useState([{title: '', isWatched: false}])
  const [displayMovies, setDisplayMovies] = React.useState([{title: '', isWatched: false}])
  const [displayWatchedMovies, setDisplayWatchedMovies] = React.useState(false);
  React.useEffect(()=>{
    fetch(`${apiURL}movies`)
    .then(res => res.json())
    .then(data => {
      setMovies(data);
      setDisplayMovies(data.filter(el => {
        return el.isWatched === displayWatchedMovies
      }));
      console.log(data)
    })
    .catch(err => {
      console.log('err');
      setMovies([{title: 'movie data not available'}]);
      setDisplayMovies([{title: 'movie data not available'}]);
    })
  },[])
  const searchMoviesHandler = () => {
    // console.log(`searched for movies`)
    let temp = movies.concat([])
    temp = temp.filter((element) => {
      return element.isWatched === displayWatchedMovies && element.title.toUpperCase().includes(document.getElementById('search-textfield').value.toUpperCase())
    })
    // console.log(temp)
    setDisplayMovies(temp);

  }

  const removeMovieHandler = (id) => {
     console.log(id)
     const init = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    }
    fetch(`${apiURL}movies/${id}`, init)
    .then(res => res.json())
    .then(data =>{
      // console.log(data)
      setMovies(data)
      setDisplayMovies(data);
    })
    .catch(err => console.log(err))
  }

  const watchedMovieToggleHandler = (element) => {
    console.log(element.id)
    let toSend = false;
    console.log('movie to toggle',element)
    if (element.isWatched){
      toSend = false;
    }
    else{
      toSend = true;
    }

    const init = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        isWatched: toSend
      })
    }
    fetch(`${apiURL}movies/${element.id}`, init)
    .then(res => res.json())
    .then(data =>{
      // console.log(data)
      setMovies(data)
      let temp = data.filter((el) => {
        let result = false
        for (let i = 0; i < displayMovies.length; i++)
        {
          if (displayMovies[i].id === el.id && displayMovies[i].isWatched === displayWatchedMovies && el.id !== element.id)
            result = true;
        }
        return result;
      })
      setDisplayMovies(temp);
    })
    .catch(err => console.log(err))

  }  

  const switchToWatchedMovies = () => {
    let temp = movies.concat([])
    temp = temp.filter((element) => {
      return element.isWatched
    })
    // console.log(temp)
    setDisplayMovies(temp);
    setDisplayWatchedMovies(true);

  }
  const switchToMoviesToWatch = () => {
    let temp = movies.concat([])
    temp = temp.filter((element) => {
      return !element.isWatched
    })
    // console.log(temp)
    setDisplayMovies(temp);
    setDisplayWatchedMovies(false);
  }
  
  return (
    <div className="App">
      <Stack spacing={2} sx ={{padding: '10px', margin: '10px'}} direction="column">
        {/* <Button onClick={searchMoviesHandler} variant="outlined">Submit</Button> */}
        <TextField onChange = {searchMoviesHandler}  id="search-textfield" label="Search" variant="outlined" />
      </Stack>
      <Stack spacing={2} direction = "row">
        <Button onClick={switchToWatchedMovies}>Watched Movies</Button>
        <Button onClick={switchToMoviesToWatch}>Movies to Watch</Button>
      </Stack>
      <Stack>
        {displayMovies.map((element, index) => {
          return (
            <Card variant="outlined"  key ={element.title} sx={{ minWidth: 275, padding: `10px`, border: `1px 1px 1px 1px`, borderColor: 'Black', marginLeft: `10vw`, marginRight: `10vw`, marginTop: `2.5vw`, marginBottom: `2.5vw`}}>
              <MovieDetailsDialog element = {element} title = {element.title} watchedMovieToggleHandler = {() => {watchedMovieToggleHandler(element)}}/>
              <Button onClick={() => {removeMovieHandler(element.id)}}>remove</Button>
            </Card>
          )
        })}
      </Stack>
      <AddMovieDialog movies={movies} setMovies={setMovies} displayMovies={displayMovies} setDisplayMovies={setDisplayMovies}/>

    </div>
  );
}

const AddMovieDialog = ({movies, setMovies, displayMovies, setDisplayMovies}) => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const handleSubmit = () => {

    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        mode: 'no-cors',

      },
      body: JSON.stringify({
        title: document.getElementById('movie-title').value,
        isWatched: false
      })
    }
    setOpen(false);
    fetch(`${apiURL}movies`, init)
    .then(res => res.json())
    .then(data =>{
      // console.log(data)
      setMovies(data)
      setDisplayMovies(data);
    })
    .catch(err => console.log(err))
  };


  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Movie to List
      </Button>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Add Movie</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a movie to the website, please fill out this form information
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="movie-title"
            label="Movie Title"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const MovieDetailsDialog = ({element, title, watchedMovieToggleHandler}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggleWatched = () => {
    setOpen(false);
    watchedMovieToggleHandler();
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        {title}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              {title}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToggleWatched} autoFocus>
              {`Toggle Watched: ${element.isWatched}`}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default App;
