import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "../features/checkout/cartSlice";
import sidebarReducer from "../features/util/sidebarSlice";
import shoppingcartReducer from "../features/checkout/shoppingcartSlice";
import dataReducer from "../features/product/dataSlice";
import categorydataReducer from "../features/product/categorydataSlice";
import checkoutresidenttabReducer from "../features/checkout/residentSlice";
import deliveryChargeReducer from "../features/checkout/deliveryChargeSlice";
import productDetailsReducer from "../features/product/productdetailsSlice";
import filterReducer from "../features/product/filterSlice";
import formReducer from "../features/form/formSlice";
import locationReducer from "../features/location/locationDataSlice";
import districtReducer from "../features/location/districtDataSlice";
import paymentmethodReducer from "../features/checkout/paymentMethodSlice";
import countrycodeReducer from "../features/form/countryCodeSlice";
import languageReducer from "../features/intl/languageSlice";
import alldataReducer from "../features/product/allDataSlice";
import contactusformReducer from "../features/util/contactUsSlice";
import requeststockformReducer from "../features/product/requestStockSlice";
import productdetailstabReducer from "../features/product/productDetailsTabsSlice";
import sliderdataReducer from "../features/product/sliderSlice";
import bestsellingproductsReducer from "../features/product/bestSellingProductsSlice";

import userloginformReducer from "../features/auth/userLoginSlice";
import usercreateaccountformReducer from "../features/auth/userCreateAccountSlice";
import userdashboardtabReducer from "../features/auth/userDashboardSlice";
import userdetailsReducer from "../features/auth/userDetailsSlice";
import orderbyuserdetailsReducer from "../features/auth/orderDetailsByUserSlice";
import orderDetailsReducer from "../features/auth/orderDetailsSlice";
import userprofileReducer from "../features/auth/userProfileSlice";
import thanaReducer from "../features/location/thanaDataSlice";
import userpinresetReducer from "../features/auth/userPinResetSlice";
import userotpReducer from "../features/auth/otpCodeSlice";
import forgetpassReducer from "../features/auth/forgetPassSlice";
import locationdisableReducer from "../features/location/locationDisableSlice";
import toasterReducer from "../features/notification/toasterSlice";

// Configuration for redux-persist
const persistConfig = {
	key: "root",
	storage,
	whitelist: ["shoppingcart"],
};

// Create persisted reducer
const persistedReducer = persistReducer(
	persistConfig,
	combineReducers({
		cart: cartReducer,
		sidebar: sidebarReducer,
		shoppingcart: shoppingcartReducer,
		data: dataReducer,
		categorydata: categorydataReducer,
		checkoutresidenttab: checkoutresidenttabReducer,
		deliverycharge: deliveryChargeReducer,
		productdetails: productDetailsReducer,
		filter: filterReducer,
		checkoutForm: formReducer,
		location: locationReducer,
		district: districtReducer,
		paymentmethod: paymentmethodReducer,
		countrycode: countrycodeReducer,
		language: languageReducer,
		alldata: alldataReducer,
		contactusform: contactusformReducer,
		requeststockform: requeststockformReducer,
		productdetailstab: productdetailstabReducer,
		sliderdata: sliderdataReducer,
		bestsellingproducts: bestsellingproductsReducer,

		userloginform: userloginformReducer,
		usercreateaccountform: usercreateaccountformReducer,
		userdashboardtab: userdashboardtabReducer,
		userdetails: userdetailsReducer,
		orderbyuserdetails: orderbyuserdetailsReducer,
		orderDetails: orderDetailsReducer,
		userprofile: userprofileReducer,
		thana: thanaReducer,
		userpinreset: userpinresetReducer,
		userotp: userotpReducer,
		forgetpass: forgetpassReducer,

		locationdisable: locationdisableReducer,
		toaster: toasterReducer,
	})
);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
