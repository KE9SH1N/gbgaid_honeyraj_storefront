import { fetchUserHistoryById } from "../../api/orderByUserApiService";
import {
	getOrderByUserDataFailure,
	getOrderByUserDataSuccess,
	selectOrderByUserDetailsData,
} from "../../redux/features/auth/orderDetailsByUserSlice";
import { getProductStart } from "../../redux/features/auth/userDetailsSlice";

export const fetchUserDetails = async (
	dispatch: any,
	userId: any,
	errorMessage: any,
	page: number
) => {
	dispatch(getProductStart());
	try {
		const productData = await fetchUserHistoryById(userId, page);
		dispatch(getOrderByUserDataSuccess(productData));
		dispatch(selectOrderByUserDetailsData(productData));
	} catch (error) {
		dispatch(getOrderByUserDataFailure(errorMessage));
	}
};
