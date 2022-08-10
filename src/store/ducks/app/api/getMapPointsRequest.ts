import {dataPoints} from "../../../../mock/dataPoint";
import {PointType} from "../../../../types";


export async function getMapPointsRequest(): Promise<PointType[]> {

    return await new Promise((resolve, reject) => resolve(dataPoints))

}
