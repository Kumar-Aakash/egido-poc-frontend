import Breadcrumb from "@/components/Breadcrumb";
import PieChartLayer from "@/components/PieChartLayer";
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
        <Breadcrumb title='Chart - Pie Chart' />

        {/* PieChartLayer */}
        <PieChartLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
