import { useStoreContext } from "@/lib/utils/store/context";


export function useAuth(){
    const {authorized, setAuthorized} = useStoreContext()
    return {
        authorized,
        setAuthorized
    }
}