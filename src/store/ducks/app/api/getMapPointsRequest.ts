import {PointType} from "../../../../types";
import localStorageService from "../../../../service/localStorage.service";


export async function getMapPointsRequest(): Promise<PointType[]> {

    const {getPoints} = localStorageService()

    const data: PointType[] = getPoints()

    return await new Promise((resolve, reject) => resolve(data))

}
