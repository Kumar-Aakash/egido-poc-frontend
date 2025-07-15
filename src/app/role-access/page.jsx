import Breadcrumb from "@/components/Breadcrumb";
import RoleAccessLayer from "@/components/RoleAccessLayer";
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
        <Breadcrumb title='Role Access' />

        {/* RoleAccessLayer */}
        <RoleAccessLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
