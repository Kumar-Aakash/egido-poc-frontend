import Breadcrumb from "@/components/Breadcrumb";
import PortfolioLayer from "@/components/PortfolioLayer";
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
        <Breadcrumb title='Portfolio' />

        {/* PortfolioLayer */}
        <PortfolioLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
