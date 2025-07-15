import Breadcrumb from "@/components/Breadcrumb";
import ProgressLayer from "@/components/ProgressLayer";
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
        <Breadcrumb title='Components / Progress Bar' />

        {/* ProgressLayer */}
        <ProgressLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
