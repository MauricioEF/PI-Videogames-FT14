import './App.css';
import {Route} from 'react-router-dom';
import Nav from './components/Nav';
import StartPanel from './components/StartPanel';
import Videogames from './components/Videogames';
import VideoGameDetail from './components/VideoGameDetail';
import CreateVideogame from './components/CreateVideogame';

function App() {
  return (
    <>
    <Route exact path='/start'>
      <StartPanel></StartPanel>
    </Route>
    <Route exact path={["/","/videogames","/videogames/:gameId","/videogame/create"]}>
    <Nav></Nav>
    </Route>
    <Route exact path={["/","/videogames"]}>
      <Videogames></Videogames>
    </Route>
    <Route path="/videogames/:gameId" render={({match})=><VideoGameDetail match={match.params.gameId}/>}/>
    <Route path="/videogame/create">
      <CreateVideogame></CreateVideogame>
    </Route>
    </>
  );
}

export default App;
