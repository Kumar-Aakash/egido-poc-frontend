import DocumentUploadLayer from "@/components/DocumentUploadLayer";
import MasterLayout from "@/masterLayout/MasterLayout";
import { Breadcrumb } from "react-bootstrap";

export const metadata = {
  title: "Package Management System",
  description: "Upload client documents for signature packages",
};

const DocumentUploadPage = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="Document Upload" />
        <DocumentUploadLayer />
      </MasterLayout>
    </>
  );
};

export default DocumentUploadPage;
