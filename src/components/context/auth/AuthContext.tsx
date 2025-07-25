import { createContext, useEffect, useLayoutEffect, useState } from "react";
import { User } from "../../../models/Accounts/User";
import { api } from "../../../api/api";
import { Accounts } from "../../../api/Endpoints/accounts";
import { toast } from "react-toastify";
import { LoginResponse } from "../../../models/Accounts/LoginResponse";

type AuthContextType = {
    user: User | undefined;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<LoginResponse | null>;
    refresh: () => Promise<LoginResponse | null>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type Props = {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [accessToken, setAccessToken] = useState<string>();
    const [user, setUser] = useState<User | undefined>();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const accessTokenInterseptor = api.interceptors.request.use((config) => {
            config.headers.Authorization = accessToken
                ? `Bearer ${accessToken}`
                : config.headers.Authorization

            return config;
        })

        return () => {
            api.interceptors.request.eject(accessTokenInterseptor);
        }
    }, [accessToken])

    useLayoutEffect(() => {
        const refreshInterseptor = api.interceptors.response.use((config) => config, async (error) => {
            if (error.response.status === 401) {
                const originalRequest = error.config;

                try {
                    const response = await Accounts.refresh();

                    setUser({email: response.data.result!.email, id: response.data.result!.userId, userName: response.data.result!.userName} as User)
                    setAccessToken(response.data.result!.accessToken)

                    await new Promise(resolve => setTimeout(resolve, 10));

                    originalRequest.headers.Authorization = `Bearer ${response.data.result!.accessToken}`;

                    return api(originalRequest);
                }
                catch {
                    setAccessToken(undefined);
                }
            }

            return Promise.reject(error);
        })

        return () => {
            api.interceptors.response.eject(refreshInterseptor);
        }
    }, [])
    
    const login = async (email: string, password: string): Promise<LoginResponse | null> => {
        try {
            setIsLoading(true);
            const response = await Accounts.login(email, password);

            setAccessToken(response.data.result!.accessToken);
            setUser({email: response.data.result!.email, id: response.data.result!.userId, userName: response.data.result!.userName} as User)

            setIsLoading(false);

            return response.data.result!;
        }
        catch (error) {
            setIsLoading(false);
            
            error.response.data.responseErrors.forEach(e => {
                toast.error(e.message)
            });

            return null;
        }
    }

    const refresh = async (): Promise<LoginResponse | null> => {
        try {
            const response = await Accounts.refresh();

            setUser({email: response.data.result!.email, id: response.data.result!.userId, userName: response.data.result!.userName} as User);
            setAccessToken(response.data.result!.accessToken);

            await new Promise(resolve => setTimeout(resolve, 10));

            return response.data.result!;
        }
        catch (error) {
            error.response.data.responseErrors.forEach(e => {
                toast.error(e.message)
            });

            return null;
        }
    }

    return <AuthContext.Provider value={{user, isLoading, login, refresh}}>{children}</AuthContext.Provider>
}