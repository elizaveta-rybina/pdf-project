import 'app/consts/i18n'
import './index.css'
import 'vm-browserify';


import store from 'app/store/store'
import { AppRoutes } from 'app/routes'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<ToastContainer autoClose={5000} />
			<AppRoutes /> {/* Использование маршрутов */}
		</Provider>
	</React.StrictMode>
)
