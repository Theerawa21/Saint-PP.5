# Saint Theresa — GitHub Pages + Google Drive

สถานะ: สร้างและทดสอบในเครื่องแล้ว ยังต้องเผยแพร่ Apps Script และตั้งค่าที่อยู่บริการจริงก่อนใช้งานออนไลน์

- `site/`: หน้าเว็บสำหรับ GitHub Pages ไม่มีฐานข้อมูลนักเรียนหรือรหัสผ่านบัญชี
- `apps-script/`: ไฟล์สำหรับ Apps Script **โครงการใหม่ที่เป็นส่วนตัว** ห้ามวางไว้ในโฟลเดอร์ที่ทุกคนแก้ไขได้
- `backend/`: API ตรวจสิทธิ์ห้อง/วิชา กฎคะแนน 4 ส่วน และการตรวจรุ่นข้อมูล
- ฐานข้อมูลหลักอยู่ในโฟลเดอร์ส่วนตัวของเจ้าของ Apps Script; สำเนาเข้ารหัส AES-256-GCM ส่งไปยังโฟลเดอร์ ปพ.5 ที่ผู้ใช้เลือกได้
- บัญชีเดิมใช้ scrypt N=16384 r=8 p=1 เช่นเดียวกับระบบ Node เดิม
- การส่งข้อมูลใช้ iframe และ google.script.run ตรวจ source/origin/channel; ไม่ส่งรหัสผ่านใน URL
- การเขียนใช้ ScriptLock และเลขรุ่นแต่ละรายการ ป้องกันบันทึกทับกัน
- ไม่มีการซิงก์อัตโนมัติระหว่างฐานข้อมูลในเครื่องเดิมกับ Google Drive หลังย้าย ต้องให้ทุกคนใช้ URL เดียวกัน

## ตั้งค่า Apps Script (เจ้าของระบบ)
1. สร้างโครงการใหม่ใน My Drive แบบส่วนตัว ใช้ Code.gs, Bridge.html และ appsscript.json จาก apps-script/ อย่าแก้โครงการเก่าในโฟลเดอร์แชร์
2. อัปโหลดไฟล์ migration ที่เข้ารหัสไว้ไปยัง Drive ส่วนตัว
3. ตั้ง Script Properties: ST_DATABASE_KEY = คีย์ 64 ตัวที่สร้างในเครื่อง (ห้ามใส่ GitHub), ST_SITE_ORIGIN = https://theerawa21.github.io, ST_IMPORT_FILE = ID ของไฟล์ migration
4. รัน initializeDatabase_ จากตัวแก้ไขหนึ่งครั้ง และอนุญาตสิทธิ์ Drive ฟังก์ชันนี้สร้างโฟลเดอร์ฐานข้อมูลส่วนตัวและบันทึก ID ให้เอง
5. Deploy เป็น Web app: Execute as Me, access Anyone ระบบตรวจบัญชีและสิทธิ์เองใน stRpc ทุกคำขอ
6. ใส่ URL /exec ที่ได้ลงใน site/cloud-config.js แล้วเผยแพร่หน้าเว็บใหม่ ห้ามใช้ URL Apps Script รุ่นเก่าซึ่งใช้โปรโตคอลคนละแบบ
7. เปิดหน้าเว็บ ทดสอบบัญชีแอดมินและครูจากภายนอก บันทึก/โหลดกลับ ตรวจห้อง/วิชาและคะแนน และทดสอบความหน่วงเมื่อใช้หลายคนจริงก่อนส่งให้ครูทั้งหมด
8. ใช้ backupToSchoolDrive_ จากตัวแก้ไขเพื่อสำรองไฟล์เข้ารหัสในโฟลเดอร์ ปพ.5 ยังไม่ได้ตั้งเวลาอัตโนมัติ

## GitHub Pages
Repository: Theerawa21/Saint-PP.5. Workflow เผยแพร่เฉพาะ site/ เท่านั้น เลือก Settings > Pages > Source: GitHub Actions แล้วรัน workflow Deploy school website ถ้ายังไม่ได้เปิด Pages.
ที่อยู่คาดหมาย https://theerawa21.github.io/Saint-PP.5/ ต้องตรวจผล deploy ก่อนถือว่าใช้งานจริง

## ทดสอบ
node tests/core-test.mjs
node tests/gas-test.mjs
node tests/browser-test.mjs
การทดสอบ Apps Script ใช้บริการ Google จำลอง ไม่ใช่หลักฐานว่า deploy จริงสำเร็จ โควตา/ความหน่วง/การล็อกพร้อมกันบน Google ต้องตรวจหลังเผยแพร่

## Dependencies
scrypt-js 3.0.1 (MIT), @noble/ciphers 1.3.0 (MIT). License text retained alongside backend bundle. Build uses esbuild from local workspace.
