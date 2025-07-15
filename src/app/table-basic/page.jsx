import Breadcrumb from "@/components/Breadcrumb";
import TableBasicLayer from "@/components/TableBasicLayer";
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

        {/* TableBasicLayer */}
        <TableBasicLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
