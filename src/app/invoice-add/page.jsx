import Breadcrumb from "@/components/Breadcrumb";
import InvoiceAddLayer from "@/components/InvoiceAddLayer";
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
        <Breadcrumb title='Invoice - Add' />

        {/* InvoiceAddLayer */}
        <InvoiceAddLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
