import { Ref } from "vue";

export function checkPasswordFormat(isClear: Ref, password: Ref, isError: Ref) {
  console.log(isClear);
  if (isClear) return;

  const pattern = "^[0-9]+$";
  const regex = new RegExp(pattern);

  const len = password.value.length;

  console.log(regex.test(password.value), password.value);
  if (!regex.test(password.value)) return (isError.value = true);
  if (len < 4 && len !== 0) {
    isError.value = true;
  } else {
    isError.value = false;
  }
}

export function checkSecondPassword(
  secondPassword: Ref,
  password: Ref,
  isSecondError: Ref
) {
  const len = secondPassword.value.length;
  if ((len < 4 && len !== 0) || secondPassword.value !== password.value) {
    isSecondError.value = true;
  } else {
    isSecondError.value = false;
  }
}
