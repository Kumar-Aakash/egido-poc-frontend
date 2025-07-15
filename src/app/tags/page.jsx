import Breadcrumb from "@/components/Breadcrumb";
import TagsLayer from "@/components/TagsLayer";
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
        <Breadcrumb title='Components / Tab & Accordion' />

        {/* TagsLayer */}
        <TagsLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
