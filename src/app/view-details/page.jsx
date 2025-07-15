import Breadcrumb from "@/components/Breadcrumb";
import ViewDetailsLayer from "@/components/ViewDetailsLayer";
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
        <Breadcrumb title='Components / Email' />

        {/* ViewDetailsLayer */}
        <ViewDetailsLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
