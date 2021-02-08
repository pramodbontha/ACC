import logo from "./logo.svg";
import "./App.css";
import Products from "./components/Products/products";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./store/reducers/reducers";

const store = createStore(reducers);
function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<Products />
			</Provider>
		</div>
	);
}

export default App;
