import AddUserLayer from "@/components/AddUserLayer";
import Breadcrumb from "@/components/Breadcrumb";
import FormPageLayer from "@/components/FormPageLayer";
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
        <Breadcrumb title='Input Form' />

        {/* FormPageLayer */}
        <FormPageLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
