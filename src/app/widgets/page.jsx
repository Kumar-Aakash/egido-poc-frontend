import Breadcrumb from "@/components/Breadcrumb";
import WidgetsLayer from "@/components/WidgetsLayer";
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
        <Breadcrumb title='Wallet' />

        {/* WidgetsLayer */}
        <WidgetsLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
