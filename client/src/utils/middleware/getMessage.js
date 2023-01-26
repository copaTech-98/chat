import Toast from "../../components/Toast/Toast";

export const getMessage = (data) => {
  const { message, userName } = JSON.parse(data);
  console.log(data);
  Toast.fire({ icon: "success", title: userName, text: message });
};
