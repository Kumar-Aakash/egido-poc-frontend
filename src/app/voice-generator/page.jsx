import Breadcrumb from "@/components/Breadcrumb";
import VoiceGeneratorLayer from "@/components/VoiceGeneratorLayer";
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
        <Breadcrumb title='Voice Generator' />

        {/* VoiceGeneratorLayer */}
        <VoiceGeneratorLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
