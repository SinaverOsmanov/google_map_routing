import {PointType} from "../types"

const mapPointsKey = 'MAP_POINTS_KEY'

function getPoints(): PointType[] {
    const data = localStorage.getItem(mapPointsKey)
    if (!data) return []
    return JSON.parse(data)
}

function add(point: PointType) {
    const data = getPoints()

    const newData = [...data, point]

    localStorage.setItem(mapPointsKey, JSON.stringify(newData))
}

function remove(id: number) {
    const data = getPoints()

    const newData = [...data.filter(route => route.id !== id)]

    localStorage.setItem(mapPointsKey, JSON.stringify(newData))
}

export default () => {
    return {getPoints, add, remove}
}
