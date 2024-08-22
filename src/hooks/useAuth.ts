import { authorizedState } from "@/lib/utils/state/recoil";
import { useRecoilState } from "recoil";



export function useAuth(){
    const [authorized, setAuthorized] = useRecoilState(authorizedState);


    return {
        authorized,
        setAuthorized
    }

}