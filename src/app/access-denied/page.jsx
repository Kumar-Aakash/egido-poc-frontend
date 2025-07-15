import AccessDeniedLayer from "@/components/AccessDeniedLayer";

export const metadata = {
  title: "Package Management System",
  description:
    "Upload and View Packages.",
};

const Page = () => {
  return (
    <>
      <AccessDeniedLayer />
    </>
  );
};

export default Page;
