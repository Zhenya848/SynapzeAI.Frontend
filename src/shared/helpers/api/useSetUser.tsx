import { toast } from "react-toastify";
import { useAppDispatch } from "../../../app/store";
import { useRefreshMutation } from "../../../features/accounts/api";
import { selectUser, setCredentials } from "../../../features/accounts/auth.slice";
import { GetCookies } from "./GetCookies";
import { useSelector } from "react-redux";

export const useSetUser = () => {
    const dispatch = useAppDispatch();
    const [refresh] = useRefreshMutation();
    const user = useSelector(selectUser);

    const setUser = async () => {
        if (user) {
            return;
        }

        const refreshTokenResult = GetCookies("refreshToken");

        if (refreshTokenResult) {
            try {
                const refreshResult = await refresh().unwrap();

                if (!refreshResult)
                    return;

                dispatch(setCredentials({ accessToken: refreshResult.result!.accessToken, user: refreshResult.result!.user }))
            }
            catch (error: any) {
                console.error("Can't refresh credentias. Errors: " + error);

                error.data.responseErrors.forEach((e: { message: string }) => {
                    toast.error(e.message);
                });
            }
        }
    }

    return setUser;
}