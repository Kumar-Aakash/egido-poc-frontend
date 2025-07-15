import Breadcrumb from "@/components/Breadcrumb";
import PaymentGatewayLayer from "@/components/PaymentGatewayLayer";
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
        <Breadcrumb title='Settings - PaymentGateway' />

        {/* PaymentGatewayLayer */}
        <PaymentGatewayLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
