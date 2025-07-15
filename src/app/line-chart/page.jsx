import Breadcrumb from "@/components/Breadcrumb";
import LineChartLayer from "@/components/LineChartLayer";
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
        <Breadcrumb title='Chart - Line Chart' />

        {/* LineChartLayer */}
        <LineChartLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
