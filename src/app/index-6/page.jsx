import Breadcrumb from "@/components/Breadcrumb";
import DashBoardLayerSix from "@/components/DashBoardLayerSix";
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
        <Breadcrumb title='LMS / Learning System' />

        {/* DashBoardLayerSix */}
        <DashBoardLayerSix />
      </MasterLayout>
    </>
  );
};

export default Page;
