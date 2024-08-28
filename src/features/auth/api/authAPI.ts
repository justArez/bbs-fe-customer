import * as httpRequest from "@/libs/axios";
import * as httpAuth from "@/libs/axios-auth";
import { ISession, ISessionUser, LoginCredentials, RegisterCredentials } from "../types";
import { IUser, getUser } from "@/features/users";
import { useMutation } from "@tanstack/react-query";

const login = async (credentials: LoginCredentials): Promise<IUser> => {
  try {
    const resLogin: IUser = await httpRequest.post("/auth/sign-in", credentials);
    if (resLogin.isActive === false || resLogin.role !== "customer") {
      throw new Error("Tài khoản của bạn không hợp lệ");
    }
    return resLogin;
  } catch (e: any) {
    throw new Error(e);
  }
};

const register = async (credentials: RegisterCredentials): Promise<IUser> => {
  try {
    const resLogin: IUser = await httpRequest.post("/userlogin", credentials);
    return resLogin;
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
    onSuccess?: (data: IUser, variables: LoginCredentials, context: unknown) => void;
    onMutate?: (variables: LoginCredentials) => Promise<IUser>;
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

export const useRegisMutation = (
  handleFn: {
    onSuccess?: (data: IUser, variables: RegisterCredentials, context: unknown) => void;
    onError?: (error: unknown, variables: RegisterCredentials, context: unknown) => void;
    onMutate?: (variables: RegisterCredentials) => Promise<IUser>;
  },
  retry?: number,
) => {
  return useMutation({
    mutationFn: (credentials: RegisterCredentials) => register(credentials),
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
