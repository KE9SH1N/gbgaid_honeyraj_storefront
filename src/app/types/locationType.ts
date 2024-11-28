import { districtInfo } from "./districtDataType";

export interface Location {
	id: number;
	name_en: string;
	name_bn: string;
	district_info: districtInfo[];
}
