import AlertLayer from "@/components/AlertLayer";
import Breadcrumb from "@/components/Breadcrumb";
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
        <Breadcrumb title='Components / Alerts' />

        {/* AlertLayer */}
        <AlertLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
