import { reactive, watch } from "vue";
import time from "./monitor/time";
import torque from "./monitor/torque";
import device from "./monitor/device";
import version from "./Info/version";
import password from "./Login/password";

const store = reactive({
  time,
  torque,
  device,
  version,
  password,
});

export default store;
