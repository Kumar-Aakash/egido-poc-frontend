import Breadcrumb from "@/components/Breadcrumb";
import WizardLayer from "@/components/WizardLayer";
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
        <Breadcrumb title='Wizard' />

        {/* WizardLayer */}
        <WizardLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
