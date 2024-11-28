"use client";
import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "../../redux/store/store";
import { PersistGate } from "redux-persist/integration/react";

interface ProviderProps {
	children: React.ReactNode;
}
const Providers: React.FC<ProviderProps> = ({ children }) => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
};

export default Providers;
