import BlankPageLayer from "@/components/BlankPageLayer";
import Breadcrumb from "@/components/Breadcrumb";
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
        <Breadcrumb title='Blank Page' />

        {/* BlankPageLayer */}
        <BlankPageLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
