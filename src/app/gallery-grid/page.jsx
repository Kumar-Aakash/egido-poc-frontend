import Breadcrumb from "@/components/Breadcrumb";
import GalleryGridLayer from "@/components/child/GalleryGridLayer";
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
        <GalleryGridLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
