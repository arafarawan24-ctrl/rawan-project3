class Student {

    // الحقول الخاصة بالطالب
    #sub1;
    #sub2;
    #sub3;
    #attendance;

    // دالة البناء
    constructor(name, sub1, sub2, sub3, attendance) {

        if (!name || name.trim() === "") {
            throw new Error("من فضلك أدخلي اسم الطالب");
        }

        this.name = name.trim();

        this.sub1 = sub1;
        this.sub2 = sub2;
        this.sub3 = sub3;
        this.attendance = attendance;
    }

    // المادة الأولى
    set sub1(value) {
        if (value === "" || String(value).trim() === "" ||
            !Number.isFinite(Number(value)) ||
            Number(value) < 0 || Number(value) > 100) {
            throw new Error("درجة المادة الأولى يجب أن تكون من 0 إلى 100");
        }

        this.#sub1 = Number(value);
    }

    get sub1() {
        return this.#sub1;
    }

    // المادة الثانية
    set sub2(value) {
        if (value === "" || String(value).trim() === "" ||
            !Number.isFinite(Number(value)) ||
            Number(value) < 0 || Number(value) > 100) {
            throw new Error("درجة المادة الثانية يجب أن تكون من 0 إلى 100");
        }

        this.#sub2 = Number(value);
    }

    get sub2() {
        return this.#sub2;
    }

    // المادة الثالثة
    set sub3(value) {
        if (value === "" || String(value).trim() === "" ||
            !Number.isFinite(Number(value)) ||
            Number(value) < 0 || Number(value) > 100) {
            throw new Error("درجة المادة الثالثة يجب أن تكون من 0 إلى 100");
        }

        this.#sub3 = Number(value);
    }

    get sub3() {
        return this.#sub3;
    }

    // نسبة الحضور
    set attendance(value) {
        if (value === "" || String(value).trim() === "" ||
            !Number.isFinite(Number(value)) ||
            Number(value) < 0 || Number(value) > 100) {
            throw new Error("نسبة الحضور يجب أن تكون من 0 إلى 100");
        }

        this.#attendance = Number(value);
    }

    get attendance() {
        return this.#attendance;
    }

    // حساب متوسط درجات الطالب
    get average() {
        return (this.#sub1 + this.#sub2 + this.#sub3) / 3;
    }

}  

// مصفوفة لتخزين بيانات الطلاب
let studentsList = [];


// ربط عناصر HTML بملف JavaScript
const studentNameInput = document.getElementById("studentName");

const sub1Input = document.getElementById("subject1");
const sub2Input = document.getElementById("subject2");
const sub3Input = document.getElementById("subject3");

const attendanceInput = document.getElementById("attendance");

const addStudentBtn = document.getElementById("addStudentBtn");

// ربط زرار لجنة الرأفة
const mercyBtn = document.getElementById("mercyBtn");

const errorMessage = document.getElementById("errorMessage");
const studentsDisplay = document.getElementById("studentsDisplay");
const finalReport = document.getElementById("finalReport");

// عند الضغط على زر إضافة طالب
addStudentBtn.onclick = function() {

    try {

        // إنشاء طالب جديد
        let student = new Student(
            studentNameInput.value,
            sub1Input.value,
            sub2Input.value,
            sub3Input.value,
            attendanceInput.value
        );

        // إضافة الطالب إلى المصفوفة
        studentsList.push(student);

        console.log("بيانات الطالب:", {
    name: student.name,
    subject1: student.sub1,
    subject2: student.sub2,
    subject3: student.sub3,
    attendance: student.attendance,
    average: student.average.toFixed(2)
});

        // عرض بيانات الطالب
studentsDisplay.innerHTML += `
    <div class="card p-3 mb-3 shadow-sm">
        <h5 class="mb-3">بيانات الطالب: ${student.name}</h5>

        <p>درجة المادة الأولى: ${student.sub1}</p>

        <p>درجة المادة الثانية: ${student.sub2}</p>

        <p>درجة المادة الثالثة: ${student.sub3}</p>

        <p>نسبة الحضور: ${student.attendance}%</p>

        <hr>

        <h6>متوسط الدرجات: ${student.average.toFixed(2)}</h6>
    </div>
`;

        // مسح خانات الإدخال
        studentNameInput.value = "";
        sub1Input.value = "";
        sub2Input.value = "";
        sub3Input.value = "";
        attendanceInput.value = "";

        // مسح رسالة الخطأ
        errorMessage.innerHTML = "";

    } catch (error) {

        // عرض رسالة الخطأ
        errorMessage.innerHTML = error.message;

    }

};


// عند الضغط على زرار لجنة الرأفة
mercyBtn.onclick = function() {

    // استخراج الطلاب الذين متوسطهم من 40 إلى 49
    let mercyStudents = studentsList.filter(student =>
        student.average >= 40 && student.average <= 49
    );

    // إضافة 5 درجات لمتوسط كل طالب
    let adjustedStudents = mercyStudents.map(student => {
        return {
            name: student.name,
            average: student.average + 5
        };
    });

    // حساب مجموع المتوسطات بعد إضافة درجات الرأفة
    let totalAverage = adjustedStudents.reduce((total, student) => {
        return total + student.average;
    }, 0);

    // حساب المتوسط العام مع تجنب القسمة على صفر
    let newAverage = 0;

    if (adjustedStudents.length > 0) {
        newAverage = totalAverage / adjustedStudents.length;
    }
    
    console.log("تقرير لجنة الرأفة:");
console.log("الطلاب المستحقون:", adjustedStudents);
console.log("عدد الطلاب:", adjustedStudents.length);
console.log("المتوسط العام بعد الرأفة:", newAverage.toFixed(2));

    // عرض التقرير النهائي
    if (adjustedStudents.length === 0) {

        finalReport.innerHTML = `
            <p>لا يوجد طلاب مستحقون للجنة الرأفة</p>
        `;

    } else {

        finalReport.innerHTML = `
            <div class="card p-3 mb-3">
                <h4>تقرير لجنة الرأفة</h4>

                <p>عدد الطلاب المستحقين: ${adjustedStudents.length}</p>

                <p>أسماء الطلاب:</p>

                <ul>
                    ${adjustedStudents.map(student =>
                        `<li>${student.name} - المتوسط الجديد: ${student.average.toFixed(2)}</li>`
                    ).join("")}
                </ul>

                <p>المتوسط العام بعد الرأفة:
                ${newAverage.toFixed(2)}</p>
            </div>
        `;
    }

};


