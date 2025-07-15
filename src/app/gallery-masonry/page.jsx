import Breadcrumb from "@/components/Breadcrumb";
import GalleryMasonryLayer from "@/components/child/GalleryMasonryLayer";
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
        <Breadcrumb title='Gallery Grid' />

        {/* GalleryLayer */}
        <GalleryMasonryLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
