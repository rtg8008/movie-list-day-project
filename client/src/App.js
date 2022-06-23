import logo from './logo.svg';
import './App.css';

function App() {
  const movies = [
    {title: 'Mean Girls'},
    {title: 'Hackers'},
    {title: 'The Grey'},
    {title: 'Sunshine'},
    {title: 'Ex Machina'},
  ]; 


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
