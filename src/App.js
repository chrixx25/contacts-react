import Main from './components/pages/Main';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './redux/contacts/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ToastContainer />
        <Main />
      </div>
    </Provider>
  );
}

export default App;
