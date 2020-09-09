# thai_address_th_en

THAI_ADDRESS_TH_EN

เป็น Libery ที่ทำขึ้นเพื่อให้สามารถดึงข้อมูล จังหวัด อำเภอและตำบล ของประเทศไทยมาใช้ได้ทั้งภาษาไทยและภาษาอังกฤษ

วิธีใช้

 - เรียก provinces
 
 ```
   const address = require('thai_address_th_en')
   
   address.provinces((res) => {
    console.log("province :", res)
   })
   
 ```

  - เรียก district
  ```
    const address = require('thai_address_th_en')
    
    address.district("กรุงเทพ", (res,err) => {
     if(err) {
      console.error(err)
     } else {
      console.log("district : ", res)
     }
    })
    
  ```
  
   - เรียก subDistrcit And Zipcode
   ```
    const address = require('thai_address_th_en')
    
    address.subDistrict("กรุงเทพ","มีนบุรี",(res,err) => {
     if(err) {
       console.error(err)
     } else {
      console.log("subDistrict :", res)
     }
    })
    
      Object return => [ { subDistrict : "example", zipcode: "example" } ]
    
   ```
   
  - เปลี่ยนภาษา
  ```
  address.locale("en")
  Default locale => th
  ```
  
  - convert TH to EN & EN to TH
  ```
  const address = require('thai_address_th_en')
  
  // type enum = ["p", "d", "sd"]
  // type p and d return string address value
  // type sd return value => { subDistrict : subDistrictValue, zipcode : zipcodeValue }
  
  address.convertTHToEN({ type: "p", data: { province: "ปทุมธานี" }  }, (res,err) => {
    if(err) {
     console.error(err)
    } else {
     console.log(res)
    }
  })
  ```
   
