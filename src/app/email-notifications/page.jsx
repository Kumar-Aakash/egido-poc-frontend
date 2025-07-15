import EmailNotificationLayer from "@/components/EmailNotificationLayer";
import MasterLayout from "@/masterLayout/MasterLayout";
import { Breadcrumb } from "react-bootstrap";

export const metadata = {
  title: "Email Notifications",
  description: "Send email notifications to clients about their document packages",
};

const EmailNotificationsPage = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="Email Notifications" />
        <EmailNotificationLayer />
      </MasterLayout>
    </>
  );
};

export default EmailNotificationsPage;
