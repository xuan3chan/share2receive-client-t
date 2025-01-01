import * as yup from "yup";

export const loginSchema = yup.object().shape({
  account: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  password: yup.string().required("Mật khẩu không được để trống"),
});
