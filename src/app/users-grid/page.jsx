import Breadcrumb from "@/components/Breadcrumb";
import UsersGridLayer from "@/components/UsersGridLayer";
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
        <Breadcrumb title='Users Grid' />

        {/* UsersGridLayer */}
        <UsersGridLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
