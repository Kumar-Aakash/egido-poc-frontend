import Breadcrumb from "@/components/Breadcrumb";
import ViewProfileLayer from "@/components/ViewProfileLayer";
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
        <Breadcrumb title='View Profile' />

        {/* ViewProfileLayer */}
        <ViewProfileLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
