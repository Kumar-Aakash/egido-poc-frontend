import Breadcrumb from "@/components/Breadcrumb";
import ThemeLayer from "@/components/ThemeLayer";
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
        <Breadcrumb title='Settings - Theme' />

        {/* ThemeLayer */}
        <ThemeLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
