import Breadcrumb from "@/components/Breadcrumb";
import CalendarMainLayer from "@/components/CalendarMainLayer";
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
        <Breadcrumb title='Components / Calendar' />

        {/* CalendarMainLayer */}
        <CalendarMainLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
