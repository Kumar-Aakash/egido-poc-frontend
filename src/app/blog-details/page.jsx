import Breadcrumb from "@/components/Breadcrumb";
import BlogDetailsLayer from "@/components/child/BlogDetailsLayer";
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
        <Breadcrumb title='Blog Details' />

        {/* BlogDetailsLayer */}
        <BlogDetailsLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
