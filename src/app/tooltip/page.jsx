import Breadcrumb from "@/components/Breadcrumb";
import ThemeLayer from "@/components/ThemeLayer";
import TooltipLayer from "@/components/TooltipLayer";
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
        <Breadcrumb title='Components / Tooltip' />

        {/* TooltipLayer */}
        <TooltipLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
