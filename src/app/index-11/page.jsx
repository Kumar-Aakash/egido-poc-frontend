import Breadcrumb from "@/components/Breadcrumb";
import DashBoardLayerEleven from "@/components/DashBoardLayerEleven";
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
        <Breadcrumb title='Finance & Banking' />

        {/* DashBoardLayerEleven */}
        <DashBoardLayerEleven />
      </MasterLayout>
    </>
  );
};

export default Page;
