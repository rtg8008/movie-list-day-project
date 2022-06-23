import logo from './logo.svg';
import './App.css';
import React from 'react'

function App() {
  const [movies, setMovies] = React.useState([{title: ''}])
  React.useEffect(()=>{
    fetch(`http://localhost:8080/movies`)
    .then(res => res.json())
    .then(data => setMovies(data))
    .catch(err => {
      console.log('err')
      setMovies([{title: 'movie data not available'}])
    })
  },[])

  return (
    <div className="App">
      <ul>
        {movies.map((element, index) => {
          return (
            <p key ={element.title}>{element.title}</p>
          )
        })}

      </ul>


    </div>
  );
}

export default App;
