/* eslint-disable no-return-assign */
import { reactive, ref, watch } from "vue";
import Service, { FuncType } from "../../websocket";
import { hasBarcode, Barcode } from "../../model/view";

const barcode = reactive({
  isBarcode: false,
  val: "",
});

Service(window.ip).addEventListener(FuncType.Msg, (msg) => {
  if (hasBarcode(msg)) {
    Object.assign(barcode, Barcode(msg));
    barcode.isBarcode = true;
    setTimeout(() => {
      barcode.isBarcode = false;
    }, 3000);
  }
});

export function useBarcode() {
  const barcodeRef = ref(barcode);

  watch(
    () => barcode,
    (barcodeValue) => (barcodeRef.value = barcodeValue)
  );

  return { barcode: barcodeRef };
}

export default barcode;
