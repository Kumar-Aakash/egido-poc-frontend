import Breadcrumb from "@/components/Breadcrumb";
import ButtonLayer from "@/components/ButtonLayer";
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
        <Breadcrumb title='Components / Button' />

        {/* ButtonLayer */}
        <ButtonLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
