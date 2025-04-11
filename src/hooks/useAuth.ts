import { getStoreContext } from "@/lib/utils/store/context";


export function useAuth(){
    const {authorized, setAuthorized} = getStoreContext()
    return {
        authorized,
        setAuthorized
    }
}