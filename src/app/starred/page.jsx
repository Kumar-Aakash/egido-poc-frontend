import Breadcrumb from "@/components/Breadcrumb";
import StarredLayer from "@/components/StarredLayer";
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
        <Breadcrumb title='Components / Email' />

        {/* StarredLayer */}
        <StarredLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
