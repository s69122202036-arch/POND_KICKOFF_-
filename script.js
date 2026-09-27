const shipments = {
  "PKJ20260927001": {receiver:"ลูกค้า POND", jersey:"เสื้อฟุตบอล", destination:"เชียงใหม่", status:"กำลังคัดแยก", date:"27 ก.ย. 2569"}
};

function createShipment(){
  const receiver=document.getElementById("receiver").value.trim()||"ลูกค้า POND";
  const jersey=document.getElementById("jersey").value;
  const qty=document.getElementById("qty").value;
  const destination=document.getElementById("destination").value;
  const code="PKJ"+new Date().toISOString().slice(0,10).replaceAll("-","")+Math.floor(100+Math.random()*900);
  shipments[code]={receiver,jersey,destination,status:"รับพัสดุแล้ว",date:"27 ก.ย. 2569"};
  localStorage.setItem("lastShipment",code);
  document.getElementById("shipmentPreview").innerHTML=`
    <div class="shipment-card">
      <div class="tag">สร้างสำเร็จ</div>
      <div class="shipment-code">${code}</div>
      <p><b>ผู้รับ:</b> ${receiver}</p>
      <p><b>สินค้า:</b> ${jersey} · ${qty}</p>
      <p><b>ปลายทาง:</b> ${destination}</p>
      <a class="btn primary full" href="tracking.html">ติดตามรายการนี้</a>
    </div>`;
}

function trackShipment(){
  const input=document.getElementById("trackInput").value.trim()||"PKJ20260927001";
  const s=shipments[input]||{receiver:"ลูกค้า POND",jersey:"เสื้อฟุตบอล",destination:"เชียงใหม่",status:"กำลังคัดแยก",date:"27 ก.ย. 2569"};
  document.getElementById("trackingResult").innerHTML=`
    <div class="tag">TRACKING RESULT</div>
    <h2>${input}</h2>
    <p><b>สถานะปัจจุบัน:</b> ${s.status}</p>
    <p class="muted">${s.jersey} → ${s.destination} · ผู้รับ ${s.receiver}</p>
    <div class="timeline">
      <div class="timeline-row"><span class="dot"></span><div><b>รับพัสดุแล้ว</b><br><small>ต้นทาง · ${s.date}</small></div></div>
      <div class="timeline-row"><span class="dot"></span><div><b>กำลังคัดแยก</b><br><small>ศูนย์กระจายสินค้า</small></div></div>
      <div class="timeline-row"><span class="dot"></span><div><b>กำลังนำจ่าย</b><br><small>รอเข้าสู่ขั้นตอนถัดไป</small></div></div>
      <div class="timeline-row"><span class="dot"></span><div><b>จัดส่งสำเร็จ</b><br><small>ปลายทาง ${s.destination}</small></div></div>
    </div>`;
}

document.addEventListener("DOMContentLoaded",()=>{
  const last=localStorage.getItem("lastShipment");
  const input=document.getElementById("trackInput");
  if(last&&input) input.value=last;
});
