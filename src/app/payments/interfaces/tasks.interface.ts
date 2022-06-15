export interface ITasks {
    id?: number,
    name: string,
    username: string,
    title: string,
    value: number | string,
    date: Date | string,
    image: string,
    isPayed: boolean
}