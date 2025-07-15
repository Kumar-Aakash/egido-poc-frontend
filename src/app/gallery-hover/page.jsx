import Breadcrumb from "@/components/Breadcrumb";
import GalleryHoverLayer from "@/components/child/GalleryHoverLayer";
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
        <Breadcrumb title='Gallery Hover' />

        {/* GalleryHoverLayer */}
        <GalleryHoverLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
