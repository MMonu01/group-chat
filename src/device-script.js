import { isMobile } from "~/scripts/device";

if (isMobile()) {
  import("~/mobile-index.jsx");
} else {
  import("~/desktop-index.jsx");
}
