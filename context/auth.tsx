import { useRootNavigation, useRouter, useSegments } from "expo-router";
import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthUser } from "../types/user";

interface AuthContextType {
  signIn: () => void;
  signOut: () => void;
  userAuth: AuthUser | null;
  authInitialized: boolean;
  setUserAuth: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (process.env.NODE_ENV !== "production") {
    if (!authContext) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return authContext;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userAuth, setUserAuth] = useState<AuthUser | null>(null);
  const [authInitialized, setAuthInitialized] = useState<boolean>(false);

  const useProtectedRoute = (user: AuthUser | null) => {
    const segments = useSegments();
    const router = useRouter();

    // checking that navigation is all good;
    const [isNavigationReady, setNavigationReady] = useState(false);
    const rootNavigation = useRootNavigation();

    useEffect(() => {
      const unsubscribe = rootNavigation?.addListener("state", (event) => {
        setNavigationReady(true);
      });
      return function cleanup() {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }, [rootNavigation]);

    useEffect(() => {
      if (!isNavigationReady) {
        return;
      }

      const inAuthGroup = segments[0] === "(auth)";

      if (!authInitialized) return;

      if (
        // If the user is not signed in and the initial segment is not anything in the auth group.
        !user &&
        !inAuthGroup
      ) {
        // Redirect to the sign-in page.
        router.push("/(auth)/sign-in");
      } else if (user && inAuthGroup) {
        // Redirect away from the sign-in page.
        router.push("/");
      }
    }, [user, segments, authInitialized, isNavigationReady]);
  };
  useEffect(() => {
    (async () => {
      // try {
      //   //get from session
      //   const user: AuthUser = {
      //     user: {
      //       _id: "6534f03e29457720585314dd",
      //       avatarUrl:
      //         "https://avatars.githubusercontent.com/u/76774572?s=400&u=8e2c6374e2a0a6cce45fff625be4e2823e99ba90&v=4",
      //       phoneNumber: "0399716348",
      //       isActive: true,
      //       otp: "$2b$10$tQbbcyEfzu.RN3fXK8UOt.Ifez/w8kVVV03RNhA49014yBA/Yn2iO",
      //       username: "Trần Quang Sáng",
      //       friends: ["64e1d5df06e46dbbe7cea836"],
      //     },
      //     expiresIn: "3d",
      //     accessToken:
      //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM0ZjAzZTI5NDU3NzIwNTg1MzE0ZGQiLCJ1c2VybmFtZSI6IjAzNjY4OTYwNzYiLCJmcmllbmRzIjpbeyJfaWQiOiI2NTM0ZWY3ZTI5NDU3NzIwNTg1MzE0ZDMiLCJhdmF0YXJVcmwiOiJodHRwczovL2VuY3J5cHRlZC10Ym4wLmdzdGF0aWMuY29tL2ltYWdlcz9xPXRibjpBTmQ5R2NTdUlHQnBTcU44WjY4TkEtUFpKaklZUU5JQXpKb3N3NFlXaWcmdXNxcD1DQVUiLCJwaG9uZU51bWJlciI6IjAzOTk3MTYzNzkxIiwidXNlcm5hbWUiOiIwMzk5NzE2Mzc5MSJ9LHsiX2lkIjoiNjUzNGVmN2UyOTQ1NzcyMDU4NTMxNGQzIiwiYXZhdGFyVXJsIjoiaHR0cHM6Ly9lbmNyeXB0ZWQtdGJuMC5nc3RhdGljLmNvbS9pbWFnZXM_cT10Ym46QU5kOUdjU3VJR0JwU3FOOFo2OE5BLVBaSmpJWVFOSUF6Sm9zdzRZV2lnJnVzcXA9Q0FVIiwicGhvbmVOdW1iZXIiOiIwMzk5NzE2Mzc5MSIsInVzZXJuYW1lIjoiMDM5OTcxNjM3OTEifV0sImlhdCI6MTY5ODIwNDUyOSwiZXhwIjoxNjk4NDYzNzI5fQ.-eNmSz3o7ZC21HAqSrTeA1yXaP7Ab6uenL43qB_c2cU",
      //     refreshToken:
      //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUxZDVmODA2ZTQ2ZGJiZTdjZWE4M2MiLCJ1c2VybmFtZSI6IjAzOTk3MTYzNDgiLCJmcmllbmRzIjpbIjY0ZTFkNWRmMDZlNDZkYmJlN2NlYTgzNiJdLCJpYXQiOjE2OTQ3ODg5NzgsImV4cCI6MTY5NTM5Mzc3OH0.c6VC6AKynE71CynX7PMxa2Ow5dlY3cma-HdaUE8G7lM",
      //     expireInRefresh: "7d",
      //   };
      //   setUserAuth(user);
      // } catch (error) {
      //   console.log("error", error);
      //   setUserAuth(null);
      // }

      setAuthInitialized(true);
      // console.log("initialize ", userAuth);
    })();
  }, []);

  useProtectedRoute(userAuth);

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          // Perform sign-in logic here
          //   setSession("xxx");
        },
        signOut: () => {
          //   setSession(null);
        },
        setUserAuth,
        userAuth,
        authInitialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
