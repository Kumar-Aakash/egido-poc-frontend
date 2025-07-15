import Breadcrumb from "@/components/Breadcrumb";
import InvoiceEditLayer from "@/components/InvoiceEditLayer";
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
        <Breadcrumb title='Invoice - Edit' />

        {/* InvoiceEditLayer */}
        <InvoiceEditLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
