import Breadcrumb from "@/components/Breadcrumb";
import TermsConditionLayer from "@/components/TermsConditionLayer";
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
        <Breadcrumb title='Terms & Conditions' />

        {/* TermsConditionLayer */}
        <TermsConditionLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
