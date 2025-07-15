import Breadcrumb from "@/components/Breadcrumb";
import KanbanLayer from "@/components/KanbanLayer";
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
        <Breadcrumb title='Kanban' />

        {/* KanbanLayer */}
        <KanbanLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
