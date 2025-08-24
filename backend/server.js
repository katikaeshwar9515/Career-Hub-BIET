import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "dzmmv4r01",
  api_key: "898384399929914",
  api_secret: "39pWAYuLXTHCFuiEoMfVT06AzS4",
});

app.listen(4000, () => {
  console.log(`Server running at port 4000`);
});
