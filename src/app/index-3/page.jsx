import Breadcrumb from "@/components/Breadcrumb";
import DashBoardLayerThree from "@/components/DashBoardLayerThree";
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
        <Breadcrumb title='eCommerce' />

        {/* DashBoardLayerThree */}
        <DashBoardLayerThree />
      </MasterLayout>
    </>
  );
};

export default Page;
