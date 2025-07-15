import Breadcrumb from "@/components/Breadcrumb";
import InvoicePreviewLayer from "@/components/InvoicePreviewLayer";
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
        <Breadcrumb title='Invoice - Preview' />

        {/* InvoicePreviewLayer */}
        <InvoicePreviewLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
