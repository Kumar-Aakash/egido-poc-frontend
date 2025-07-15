import Breadcrumb from "@/components/Breadcrumb";
import InvoiceListLayer from "@/components/InvoiceListLayer";
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
        <Breadcrumb title='Invoice - List' />

        {/* InvoiceListLayer */}
        <InvoiceListLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
