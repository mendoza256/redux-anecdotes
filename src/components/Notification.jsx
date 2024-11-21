import { useNotificationValue } from "../contexts/notificationContext";

const Notification = () => {
  const notification = useNotificationValue();

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };
  return <div style={style}>{notification}</div>;
};

export default Notification;
