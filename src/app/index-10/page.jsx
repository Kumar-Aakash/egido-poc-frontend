import Breadcrumb from "@/components/Breadcrumb";
import DashBoardLayerTen from "@/components/DashBoardLayerTen";
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
        <Breadcrumb title='POS & Inventory' />

        {/* DashBoardLayerTen */}
        <DashBoardLayerTen />
      </MasterLayout>
    </>
  );
};

export default Page;
