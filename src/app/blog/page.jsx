import Breadcrumb from "@/components/Breadcrumb";
import BlogLayer from "@/components/child/BlogLayer";
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
        <Breadcrumb title='Blog' />

        {/* BlogLayer */}
        <BlogLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
