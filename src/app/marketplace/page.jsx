import Breadcrumb from "@/components/Breadcrumb";
import MarketplaceLayer from "@/components/MarketplaceLayer";
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
        <Breadcrumb title='Marketplace' />

        {/* MarketplaceLayer */}
        <MarketplaceLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
