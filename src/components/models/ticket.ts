import { Product } from "../hooks/useForm";

export default interface Ticket {
    id: number,
    user_id: number,
    product: Product,
    description: string,
    status: 'new' | 'open' | 'closed',
    staff_name: string,
    user_name: string,
    createdat: string,
    updatedat: string | null
}