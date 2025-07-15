import Breadcrumb from "@/components/Breadcrumb";
import DashBoardLayerSeven from "@/components/DashBoardLayerSeven";
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
        <Breadcrumb title='NFT & Gaming' />

        {/* DashBoardLayerSeven */}
        <DashBoardLayerSeven />
      </MasterLayout>
    </>
  );
};

export default Page;
