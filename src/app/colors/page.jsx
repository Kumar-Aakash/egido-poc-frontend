import AddUserLayer from "@/components/AddUserLayer";
import Breadcrumb from "@/components/Breadcrumb";
import ColorsLayer from "@/components/ColorsLayer";
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
        <Breadcrumb title='Components / Colors' />

        {/* ColorsLayer */}
        <ColorsLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
