import './App.css';
import AppRouter from './rout/rout';
import { Provider } from "react-redux";
import myStore from './redux/store'

function App() {
  return (
    <div className="App">
      <Provider store={myStore}>
      <AppRouter />
      </Provider>
    </div>
  );
}

export default App;
