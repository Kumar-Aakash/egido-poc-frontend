import Breadcrumb from "@/components/Breadcrumb";
import TextGeneratorLayer from "@/components/TextGeneratorLayer";
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
        <Breadcrumb title='Text Generator' />

        {/* TextGeneratorLayer */}
        <TextGeneratorLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
