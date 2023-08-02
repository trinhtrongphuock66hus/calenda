// Biến toàn cục để theo dõi tháng và năm hiện tại
let currentMonth = 0;
let currentYear = 0;

// Biến toàn cục để theo dõi số lượng tháng được giảm đi
let monthOffset = 0;
let yearOffset = 0;

// Danh sách các ngày cần bôi màu (định dạng: "YYYY-MM-DD")
const highlightedDates = [
    "2023-07-20",
    "2023-07-21",
    "2023-07-22",
    "2023-07-23",
    "2023-07-24",
    "2023-07-25",
    "2023-07-26",
    "2023-07-27",
    "2023-07-29",
    "2023-07-31",
    "2023-08-01",
    "2023-08-02",
  ];
  const highlighted = [
    "2023-07-30"

  ];

// Hàm kiểm tra năm nhuận
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// Hàm tạo bảng lịch
function createCalendar() {
    const calendarContainer = document.getElementById("calendar");
    const today = new Date();
    let year = today.getFullYear() ;
    let month = (today.getMonth() + monthOffset) % 12;

    // Kiểm tra nếu tháng hoặc năm bị quay lại năm hoặc năm tiếp theo
    if (month < 0) {
        month += 12;
        year--;
    } else if (month > 11) {
        month -= 12;
        year++;
    }

    const months = [
        "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
        "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
    ];

    const daysInMonth = [
        31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30,
        31, 31, 30, 31, 30, 31
    ];

    const firstDayOfMonth = new Date(year, month, 1);
    let startingDay = firstDayOfMonth.getDay();

    // Điều chỉnh ngày bắt đầu của bảng lịch để ngày 1 bắt đầu từ thứ Hai
    startingDay = (startingDay === 0) ? 6 : startingDay - 1;

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // Tạo tiêu đề cho bảng lịch
    const headerRow = document.createElement("tr");
    const monthHeader = document.createElement("th");
    monthHeader.colSpan = 7;
    monthHeader.textContent = months[month] + " " + year;
    headerRow.appendChild(monthHeader);
    thead.appendChild(headerRow);

    // Tạo tiêu đề cho các ngày trong tuần
    const daysHeaderRow = document.createElement("tr");
    const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"];
    for (const day of days) {
        const dayHeader = document.createElement("th");
        dayHeader.textContent = day;
        daysHeaderRow.appendChild(dayHeader);
    }
    thead.appendChild(daysHeaderRow);

    // Thêm dữ liệu cho bảng lịch
    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < startingDay) {
                const emptyCell = document.createElement("td");
                row.appendChild(emptyCell);
            } else if (date > daysInMonth[month]) {
                break;
            } else {
                const cell = document.createElement("td");
                cell.textContent = date;
                if (year === today.getFullYear() && month === today.getMonth() && date === today.getDate()) {
                    cell.classList.add("today");
                }

                // Kiểm tra xem ngày hiện tại có nằm trong danh sách các ngày cần bôi màu không
                const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                if (highlightedDates.includes(formattedDate)) {
                    cell.classList.add("highlighted");
                }
                const formatted = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                if (highlighted.includes(formatted)) {
                    cell.classList.add("highligh");
                }

                row.appendChild(cell);
                date++;
            }
        }
        tbody.appendChild(row);
    }

    table.appendChild(thead);
    table.appendChild(tbody);

    // Xóa nội dung cũ và thêm bảng lịch mới vào container
    calendarContainer.innerHTML = '';
    calendarContainer.appendChild(table);

    // Cập nhật biến toàn cục để theo dõi tháng và năm hiện tại
    currentMonth = month;
    currentYear = year;
}

// Hàm chuyển đến tháng trước
function prevMonth() {
    monthOffset--;
    createCalendar();
}

// Hàm chuyển đến tháng sau
function nextMonth() {
    monthOffset++;
    createCalendar();
}

// Gọi hàm tạo bảng lịch khi trang web được tải
document.addEventListener("DOMContentLoaded", createCalendar);
