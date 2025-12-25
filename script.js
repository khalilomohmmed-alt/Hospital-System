let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

// دالة لعرض المواعيد
function displayAppointments() {
    const container = document.getElementById('appointments');
    container.innerHTML = "<h3>المواعيد المحجوزة:</h3>";
    appointments.forEach(app => {
        const div = document.createElement('div');
        div.className = 'appointment-card';
        div.innerHTML = `
            <p><b>رقم الحجز:</b> ${app.booking}</p>
            <p><b>الاسم:</b> ${app.name}</p>
            <p><b>العمر:</b> ${app.age}</p>
            <p><b>القسم:</b> ${app.department}</p>
            <p><b>التاريخ:</b> ${app.date}</p>
            <p><b>الوقت:</b> ${app.time}</p>
        `;
        container.appendChild(div);
    });
}

// عند تحميل الصفحة، عرض المواعيد
displayAppointments();

// معالجة الفورم
document.getElementById('appointmentForm').addEventListener('submit', function(e){
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value.trim();
    const department = document.getElementById('department').value;

    if(!name || !age || !department){
        showMessage('يرجى ملء جميع الحقول', 'error');
        return;
    }

    const date = new Date();
    const appointment = {
        booking: Math.floor(1000 + Math.random()*9000),
        name,
        age,
        department,
        date: date.toLocaleDateString('ar-EG'),
        time: date.toLocaleTimeString('ar-EG')
    };

    appointments.unshift(appointment); // إضافة فوق
    localStorage.setItem('appointments', JSON.stringify(appointments));
    displayAppointments();
    showMessage(`تم حجز الموعد بنجاح. رقم الحجز: ${appointment.booking}`, 'success');

    this.reset();
});

// دالة لإظهار رسالة
function showMessage(msg, type){
    const div = document.getElementById('message');
    div.innerHTML = msg;
    div.className = type;
    setTimeout(()=>{ div.innerHTML = ''; div.className=''; }, 4000);
}