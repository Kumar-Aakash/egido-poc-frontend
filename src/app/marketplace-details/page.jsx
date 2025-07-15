import Breadcrumb from "@/components/Breadcrumb";
import MarketplaceDetailsLayer from "@/components/MarketplaceDetailsLayer";
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
        <Breadcrumb title='Marketplace Details' />

        {/* MarketplaceDetailsLayer */}
        <MarketplaceDetailsLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
