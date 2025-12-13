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
            catch (error: unknown) {
                console.error(error);
            }
        }
    }

    return setUser;
}