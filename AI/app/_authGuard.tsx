import React, { useEffect, useState, ReactNode } from "react";
import { View, ActivityIndicator, Platform } from "react-native";
import { useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";

type AuthGuardProps = {
  children: ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const [checking, setChecking] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const checkAuth = async () => {
      let token = null;
      if (Platform.OS === "web") {
        token = localStorage.getItem("userToken");
      } else {
        token = await SecureStore.getItemAsync("userToken");
      }
      // Get the current route (first segment after root)
      const currentRoute = segments.length > 0 ? `/${segments[0]}` : "/";
      if (!token && currentRoute !== "/logIn") {
        router.replace("/logIn");
      } else {
        setChecking(false);
      }
    };
    checkAuth();
  }, [router, segments]);

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;