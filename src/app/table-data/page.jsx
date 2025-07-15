import Breadcrumb from "@/components/Breadcrumb";
import TableDataLayer from "@/components/TableDataLayer";
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
        <Breadcrumb title='Basic Table' />

        {/* TableDataLayer */}
        <TableDataLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
