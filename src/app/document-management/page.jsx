import DocumentManagementLayer from "@/components/DocumentManagementLayer";
import MasterLayout from "@/masterLayout/MasterLayout";
import { Breadcrumb } from "react-bootstrap";

export const metadata = {
  title: "Package Management System",
  description: "Manage client document packages for tax and accounting firms",
};

const DocumentManagementPage = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="Document Management" />
        <DocumentManagementLayer />
      </MasterLayout>
    </>
  );
};

export default DocumentManagementPage;
