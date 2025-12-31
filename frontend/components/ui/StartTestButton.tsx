"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

export const StartTestButton = () => {
  const user = useAuth();

  return (
    <Link href={user.user ? "/dashboard" : "/signup"}>
      <Button
        variant="outline"
        className="text-lg md:px-8 py-3 bg-white text-blue-600 border-white hover:bg-blue-50 hover:text-blue-700"
      >
        Start Creating Tests Now
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </Link>
  );
};
