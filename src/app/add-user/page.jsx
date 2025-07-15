import AddUserLayer from "@/components/AddUserLayer";
import Breadcrumb from "@/components/Breadcrumb";
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
        <Breadcrumb title='Add User' />

        {/* AddUserLayer */}
        <AddUserLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
