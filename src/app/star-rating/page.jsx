import Breadcrumb from "@/components/Breadcrumb";
import StarRatingLayer from "@/components/StarRatingLayer";
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
        <Breadcrumb title='Components / Star Ratings' />

        {/* StarRatingLayer */}
        <StarRatingLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
