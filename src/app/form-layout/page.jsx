import Breadcrumb from "@/components/Breadcrumb";
import FormLayoutLayer from "@/components/FormLayoutLayer";
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
        <Breadcrumb title='Input Layout' />

        {/* FormLayoutLayer */}
        <FormLayoutLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
