import lib from "./src"

lib.locale("en")

lib.subDistrict({ province : "Bangkok", district : "Khlong Toei" }, (e) => {
  console.log("value :", e)
})
