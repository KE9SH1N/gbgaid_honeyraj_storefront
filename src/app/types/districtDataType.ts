import { divisionInfo } from "./divisionDataType";
import { thanaDataInfo } from "./thanaDataType";

export interface districtInfo {
	id: number;
	name_en: string;
	name_bn: string;
	division: divisionInfo[];
	thana_info: thanaDataInfo[];
}
