import Breadcrumb from "@/components/Breadcrumb";
import ColumnChartLayer from "@/components/ColumnChartLayer";
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
        <Breadcrumb title='Chart / Column Chart' />

        {/* ColumnChartLayer */}
        <ColumnChartLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
