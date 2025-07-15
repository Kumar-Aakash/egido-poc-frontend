import Breadcrumb from "@/components/Breadcrumb";
import CompanyLayer from "@/components/CompanyLayer";
import MasterLayout from "@/masterLayout/MasterLayout";

export const metadata = {
  title: "Package Management System",
  description:
    "Upload and View Packages.",
};

const Page = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Settings - Company' />

        {/* CompanyLayer */}
        <CompanyLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
