"use client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

// Dynamically import the client component with SSR disabled
const ClientReviewLayer = dynamic(() => import("@/components/ClientReviewLayer"), { ssr: false });

const ClientReviewPage = ({ params }) => {
  const { token } = params;
  if (!token) notFound();

  return (
    <div className="client-portal">
      <ClientReviewLayer token={token} />
    </div>
  );
};

export default ClientReviewPage;
