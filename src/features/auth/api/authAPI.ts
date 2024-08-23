import * as httpRequest from "@/libs/axios";
import * as httpAuth from "@/libs/axios-auth";
import { ILogin, ISession, ISessionUser, LoginCredentials } from "../types";
import { IUser, getUser } from "@/features/users";
import { useMutation } from "@tanstack/react-query";

const login = async (credentials: LoginCredentials): Promise<ILogin> => {
  try {
    const resLogin: { token: string } = await httpRequest.post("/auth/sign-in", credentials);
    localStorage.setItem("token", resLogin.token);
    const resUser: IUser = await getUser();
    return { token: resLogin.token, user: resUser };
  } catch (e: any) {
    throw new Error(e);
  }
};

const getSessionUser = async (): Promise<ISessionUser> => {
  try {
    const resSession: ISession = await httpAuth.get("/auth/session");
    const resUser: IUser = await getUser();
    sessionStorage.setItem("badminton-session", resSession.sessionId);
    return { session: resSession, user: resUser };
  } catch (e: any) {
    throw new Error(e.error);
  }
};

export const useLoginMutation = (
  handleFn: {
    onError?: (error: unknown, variables: LoginCredentials, context: unknown) => void;
    onSuccess?: (data: ILogin, variables: LoginCredentials, context: unknown) => void;
    onMutate?: (variables: LoginCredentials) => Promise<ILogin>;
  },
  retry?: number,
) => {
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onError: handleFn.onError,
    onSuccess: handleFn.onSuccess,
    onMutate: handleFn.onMutate,
    retry,
  });
};

export const useGetSessionUserMutation = (
  handleFn: {
    onError?: (error: unknown, variables: unknown, context: unknown) => void;
    onSuccess?: (data: ISessionUser, variables: unknown, context: unknown) => void;
    onMutate?: (variables: unknown) => Promise<ISessionUser>;
  },
  retry?: number,
) => {
  return useMutation({
    mutationFn: getSessionUser,
    onError: handleFn.onError,
    onSuccess: handleFn.onSuccess,
    onMutate: handleFn.onMutate,
    retry,
  });
};
