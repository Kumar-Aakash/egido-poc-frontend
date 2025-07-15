import Breadcrumb from "@/components/Breadcrumb";
import SwitchLayer from "@/components/SwitchLayer";
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
        <Breadcrumb title='Components / Switch' />

        {/* SwitchLayer */}
        <SwitchLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
