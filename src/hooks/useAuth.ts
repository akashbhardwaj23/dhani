import { useStoreContext } from "./useWallets";


export function useAuth(){
    const {authorized, setAuthorized} = useStoreContext()
    return {
        authorized,
        setAuthorized
    }
}