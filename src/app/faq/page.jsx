import Breadcrumb from "@/components/Breadcrumb";
import FaqLayer from "@/components/FaqLayer";
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
        <Breadcrumb title='Faq' />

        {/* FaqLayer */}
        <FaqLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
