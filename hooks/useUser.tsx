import { useEffect, useState, createContext, useContext } from "react";
import {
  useUser as useSupaUser,
  useSessionContext,
  User,
} from "@supabase/auth-helpers-react";

import { UserDetails, Subscription } from "@/types";

// Define the shape of the user context
type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

// Create the user context with the initial value set as undefined
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

// User context provider component
export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsloadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  // Fetch user details from the 'users' table using Supabase
  const getUserDetails = () => supabase.from("users").select("*").single();

  // I did not include the subscription functionality yet.
  // Fetch subscription details from the 'subscriptions' table using Supabase
  const getSubscription = () =>
    supabase
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .single();

  useEffect(() => {
    // Check if user exists and necessary data is not already loaded
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsloadingData(true);

      // Fetch user details and subscription concurrently
      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (results) => {
          const userDetailsPromise = results[0];
          const subscriptionPromise = results[1];

          // Set the user details if the promise is fulfilled
          if (userDetailsPromise.status === "fulfilled")
            setUserDetails(userDetailsPromise.value.data as UserDetails);

          // Set the subscription if the promise is fulfilled
          if (subscriptionPromise.status === "fulfilled")
            setSubscription(subscriptionPromise.value.data as Subscription);

          setIsloadingData(false);
        }
      );
    } else if (!user && !isLoadingUser && !isLoadingData) {
      // Reset the user details and subscription if the user doesn't exist
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  };

  // Provide the user context value to the child components
  return <UserContext.Provider value={value} {...props} />;
};

// Custom hook to consume the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};
