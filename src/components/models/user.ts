export default interface User {
    id: number,
    name: string,
    email: string,
    is_staff: boolean,
    is_admin: boolean,
    ticket_count: number,
    createdat: string
}