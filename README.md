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
    
    address.district("กรุงเทพ", (res) => {
      console.log("district : ", res)
    })
    
  ```
  
   - เรียก subDistrcit And Zipcode
   ```
    const address = require('thai_address_th_en')
    
    address.subDistrict("กรุงเทพ","มีนบุรี",(res) => {
      console.log("subDistrict :", res)
    })
    
      Object return => [ { subDistrict : "example", zipcode: "example" } ]
    
   ```
   
  - เปลี่ยนภาษา
  ```
  address.locale("en")
  Default locale => th
  ```
   
