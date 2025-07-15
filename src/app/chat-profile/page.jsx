import Breadcrumb from "@/components/Breadcrumb";
import ChatProfileLayer from "@/components/ChatProfileLayer";
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
        <Breadcrumb title='Chat' />

        {/* ChatProfileLayer */}
        <ChatProfileLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
