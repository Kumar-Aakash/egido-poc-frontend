import Breadcrumb from "@/components/Breadcrumb";
import DashBoardLayerFive from "@/components/DashBoardLayerFive";
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
        <Breadcrumb title='Investment' />

        {/* DashBoardLayerFive */}
        <DashBoardLayerFive />
      </MasterLayout>
    </>
  );
};

export default Page;
