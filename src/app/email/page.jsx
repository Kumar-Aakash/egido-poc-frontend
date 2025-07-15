import Breadcrumb from "@/components/Breadcrumb";
import EmailLayer from "@/components/EmailLayer";
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
        <Breadcrumb title='Email' />

        {/* EmailLayer */}
        <EmailLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
