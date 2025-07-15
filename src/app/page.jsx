"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HomeRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    // Check for user in localStorage
    const storedUser = typeof window !== "undefined" ? localStorage.getItem("authUser") : null;
    if (storedUser) {
      router.replace("/document-management");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return null; // Optionally, you can show a loading spinner here
};

export default HomeRedirect;
