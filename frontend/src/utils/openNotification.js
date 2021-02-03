import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const openNotificationWithIcon = (
  icon = <SmileOutlined style={{ color: "#108ee9" }} />,
  message = "Notification Title",
  description = "This is the content of the notification."
) => {
  notification.open({
    message,
    description,
    icon,
  });
};

export default openNotificationWithIcon;
