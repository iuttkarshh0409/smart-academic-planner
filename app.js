// MCA Academic Planner - IIPS DAVV Indore
class MCAcademicPlanner {
    constructor() {
        this.currentTab = 'dashboard';
        this.currentTimetableDay = 'monday-tuesday';
        this.attendanceChart = null;
        this.progressChart = null;
        this.data = this.loadAcademicData();
        this.init();
    }

    // Load real academic data
    loadAcademicData() {
        return {
            studentInfo: {
                course: "MCA Semester V (Section A)",
                room: "201",
                semester: "July-Dec 2025",
                institution: "International Institute of Professional Studies, Devi Ahilya University, Indore"
            },
            timetable: {
                "monday-tuesday": {
                    "10:00-11:00": {
                        code: "IC-501D",
                        subject: "Python",
                        type: "theory",
                        faculty: "Visiting Faculty"
                    },
                    "11:00-12:00": {
                        code: "IC-502C",
                        subject: "Introduction to Data Science",
                        type: "theory",
                        faculty: "Dr Shaligram Prajapat"
                    },
                    "12:00-13:00": {
                        code: "IC-503A",
                        subject: "Computer Graphics & Multimedia",
                        type: "theory",
                        faculty: "Dr. Basant Namdeo"
                    },
                    "13:00-15:00": {
                        code: "IC-507E",
                        subject: "Python Lab",
                        type: "lab",
                        faculty: "Visiting Faculty (DC lab)"
                    }
                },
                "wednesday-thursday": {
                    "09:00-10:00": {
                        code: "IC-501D",
                        subject: "Python",
                        type: "theory",
                        faculty: "Visiting Faculty"
                    },
                    "10:00-11:00": {
                        code: "IC-502C",
                        subject: "Introduction to Data Science",
                        type: "theory",
                        faculty: "Dr Shaligram Prajapat"
                    },
                    "11:00-12:00": {
                        code: "IC-512B",
                        subject: "Computer Oriented Numerical Methods",
                        type: "theory",
                        faculty: "Dr Rupesh Sendre"
                    },
                    "12:00-13:00": {
                        code: "IC-504A",
                        subject: "System Programming",
                        type: "theory",
                        faculty: "Ms Kirti Vijayvargiya"
                    }
                },
                "friday-saturday": {
                    "10:00-11:00": {
                        code: "IC-512B",
                        subject: "Computer Oriented Numerical Methods",
                        type: "theory",
                        faculty: "Dr Rupesh Sendre"
                    },
                    "11:00-12:00": {
                        code: "IC-504A",
                        subject: "System Programming",
                        type: "theory",
                        faculty: "Ms Kirti Vijayvargiya"
                    },
                    "12:00-13:00": {
                        code: "IC-503A",
                        subject: "Computer Graphics & Multimedia",
                        type: "theory",
                        faculty: "Dr. Basant Namdeo"
                    },
                    "13:00-15:00": {
                        code: "IC-508E",
                        subject: "Computer Graphics & Multimedia Lab",
                        type: "lab",
                        faculty: "Visiting Faculty (DC lab)"
                    }
                }
            },
            subjects: {
                "IC-501D": {
                    name: "Programming with Python",
                    faculty: "Visiting Faculty",
                    weeklyClasses: 4,
                    totalSemesterClasses: 64,
                    type: "theory"
                },
                "IC-502C": {
                    name: "Introduction to Data Science",
                    faculty: "Dr Shaligram Prajapat",
                    weeklyClasses: 4,
                    totalSemesterClasses: 64,
                    type: "theory"
                },
                "IC-503A": {
                    name: "Computer Graphics & Multimedia",
                    faculty: "Dr. Basant Namdeo",
                    weeklyClasses: 4,
                    totalSemesterClasses: 64,
                    type: "theory"
                },
                "IC-504A": {
                    name: "System Programming",
                    faculty: "Ms Kirti Vijayvargiya",
                    weeklyClasses: 4,
                    totalSemesterClasses: 64,
                    type: "theory"
                },
                "IC-512B": {
                    name: "Computer Oriented Numerical Methods",
                    faculty: "Dr Rupesh Sendre",
                    weeklyClasses: 4,
                    totalSemesterClasses: 64,
                    type: "theory"
                },
                "IC-507E": {
                    name: "Python Lab",
                    faculty: "Visiting Faculty (DC lab)",
                    weeklyClasses: 2,
                    totalSemesterClasses: 32,
                    type: "lab"
                },
                "IC-508E": {
                    name: "Computer Graphics & Multimedia Lab",
                    faculty: "Visiting Faculty (DC lab)",
                    weeklyClasses: 2,
                    totalSemesterClasses: 32,
                    type: "lab"
                }
            },
            academicCalendar: {
                semesterStart: "2025-07-08",
                semesterEnd: "2025-11-08",
                classesEnd: "2025-11-08",
                endSemExam: "2025-11-25 to 2025-12-15",
                events: [
                    {
                        name: "Class Test 1",
                        date: "2025-08-20 to 2025-08-25",
                        type: "exam",
                        resultDate: "2025-08-31"
                    },
                    {
                        name: "Class Test 2",
                        date: "2025-10-06 to 2025-10-11",
                        type: "exam",
                        resultDate: "2025-10-16"
                    },
                    {
                        name: "Diwali Vacation",
                        date: "2025-10-18 to 2025-10-23",
                        type: "holiday"
                    },
                    {
                        name: "Class Test 3",
                        date: "2025-11-10 to 2025-11-14",
                        type: "exam",
                        resultDate: "2025-11-20"
                    },
                    {
                        name: "End Semester Exam",
                        date: "2025-11-25 to 2025-12-15",
                        type: "exam"
                    }
                ]
            },
            attendance: this.loadAttendanceData()
        };
    }

    // Load or initialize attendance data
    loadAttendanceData() {
        const saved = localStorage.getItem('mcaAttendanceData');
        if (saved) {
            return JSON.parse(saved);
        }

        // Initialize with sample data
        const attendance = {};
        const subjects = {
            "IC-501D": { totalSemesterClasses: 64 },
            "IC-502C": { totalSemesterClasses: 64 },
            "IC-503A": { totalSemesterClasses: 64 },
            "IC-504A": { totalSemesterClasses: 64 },
            "IC-512B": { totalSemesterClasses: 64 },
            "IC-507E": { totalSemesterClasses: 32 },
            "IC-508E": { totalSemesterClasses: 32 }
        };

        Object.keys(subjects).forEach(code => {
            const totalClasses = subjects[code].totalSemesterClasses;
            const classesHeld = Math.floor(totalClasses * 0.25); // 25% into semester
            const attendedClasses = Math.floor(classesHeld * (0.8 + Math.random() * 0.15)); // 80-95% attendance
            attendance[code] = {
                total: classesHeld,
                attended: attendedClasses,
                history: []
            };
        });
        return attendance;
    }

    // Save attendance data
    saveAttendanceData() {
        localStorage.setItem('mcaAttendanceData', JSON.stringify(this.data.attendance));
    }

    // Initialize the application
    init() {
        this.setupEventListeners();
        this.updateCurrentDate();
        this.loadDashboard();
    }

    // Setup event listeners
    setupEventListeners() {
        // Tab navigation - Fixed to ensure proper event handling
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Tab clicked:', e.target);
                const tabName = e.target.getAttribute('data-tab');
                console.log('Switching to tab:', tabName);
                if (tabName) {
                    this.switchTab(tabName);
                }
            });
        });

        // Timetable day tabs
        document.querySelectorAll('.day-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const dayName = e.target.getAttribute('data-day');
                if (dayName) this.switchTimetableDay(dayName);
            });
        });

        // Quick access menu
        const quickAccessBtn = document.getElementById('quickAccessBtn');
        const quickMenu = document.getElementById('quickMenu');
        if (quickAccessBtn && quickMenu) {
            quickAccessBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                quickMenu.classList.toggle('hidden');
            });

            document.addEventListener('click', (e) => {
                if (!quickAccessBtn.contains(e.target)) {
                    quickMenu.classList.add('hidden');
                }
            });
        }

        // Quick menu actions
        document.querySelectorAll('.quick-menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const action = e.target.getAttribute('data-action');
                this.handleQuickAction(action);
            });
        });

        // Export buttons
        document.getElementById('exportDataBtn')?.addEventListener('click', () => {
            this.showModal('exportModal');
        });

        document.getElementById('confirmExport')?.addEventListener('click', () => {
            this.handleExport();
        });

        // Target attendance change
        document.getElementById('targetAttendance')?.addEventListener('input', (e) => {
            this.updateBunkCalculations(parseInt(e.target.value));
        });

        // Modal controls
        document.querySelectorAll('.modal-close, #cancelExport').forEach(btn => {
            btn.addEventListener('click', () => this.hideModals());
        });

        // Mark all present
        document.getElementById('markAllPresentBtn')?.addEventListener('click', () => {
            this.markAllPresent();
        });

        // Other action buttons
        document.getElementById('viewBunksBtn')?.addEventListener('click', () => {
            this.switchTab('bunk-calculator');
        });

        document.getElementById('exportCalendarBtn')?.addEventListener('click', () => {
            this.exportCalendar();
        });
    }

    // Update current date display
    updateCurrentDate() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const currentDateElement = document.getElementById('currentDate');
        if (currentDateElement) {
            currentDateElement.textContent = now.toLocaleDateString('en-US', options);
        }
    }

    // Switch between tabs - Fixed implementation
    switchTab(tabName) {
        console.log('switchTab called with:', tabName);
        
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => {
            console.log('Hiding content:', content.id);
            content.classList.remove('active');
            content.style.display = 'none';
        });

        // Remove active class from all tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });

        // Show selected tab content
        const targetTab = document.getElementById(tabName);
        console.log('Target tab element:', targetTab);
        if (targetTab) {
            targetTab.classList.add('active');
            targetTab.style.display = 'block';
            console.log('Showing tab:', tabName);
        } else {
            console.error('Tab not found:', tabName);
        }

        // Add active class to selected tab
        const activeTabButton = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeTabButton) {
            activeTabButton.classList.add('active');
        }

        this.currentTab = tabName;

        // Load specific content for each tab
        setTimeout(() => {
            switch(tabName) {
                case 'dashboard':
                    this.loadDashboard();
                    break;
                case 'timetable':
                    this.loadTimetable();
                    break;
                case 'attendance':
                    this.loadAttendance();
                    break;
                case 'bunk-calculator':
                    this.loadBunkCalculator();
                    break;
                case 'calendar':
                    this.loadCalendar();
                    break;
                case 'analytics':
                    this.loadAnalytics();
                    break;
            }
        }, 50);
    }

    // Switch timetable day
    switchTimetableDay(dayName) {
        document.querySelectorAll('.day-tab').forEach(tab => {
            tab.classList.remove('active');
        });

        const activeTab = document.querySelector(`[data-day="${dayName}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        this.currentTimetableDay = dayName;
        this.renderTimetableGrid();
    }

    // Load dashboard
    loadDashboard() {
        this.updateDashboardStats();
        this.loadTodaySchedule();
        this.updateSemesterProgress();
        this.loadUpcomingEvents();
    }

    // Update dashboard statistics
    updateDashboardStats() {
        const overallAttendance = this.calculateOverallAttendance();
        const todayClasses = this.getTodayClasses().length;
        const lowAttendanceCount = this.getLowAttendanceSubjects().length;
        const safeBunks = this.calculateTotalSafeBunks();
        const nextClass = this.getNextClass();

        const overallAttendanceEl = document.getElementById('overallAttendance');
        const todayClassesEl = document.getElementById('todayClasses');
        const lowAttendanceCountEl = document.getElementById('lowAttendanceCount');
        const safeBunksEl = document.getElementById('safeBunks');

        if (overallAttendanceEl) overallAttendanceEl.textContent = `${overallAttendance}%`;
        if (todayClassesEl) todayClassesEl.textContent = todayClasses;
        if (lowAttendanceCountEl) lowAttendanceCountEl.textContent = lowAttendanceCount;
        if (safeBunksEl) safeBunksEl.textContent = safeBunks;

        const attendanceStatus = document.getElementById('attendanceStatus');
        const nextClassEl = document.getElementById('nextClass');
        
        if (attendanceStatus) {
            if (overallAttendance >= 85) {
                attendanceStatus.textContent = 'Excellent';
                attendanceStatus.className = 'status-text safe';
            } else if (overallAttendance >= 75) {
                attendanceStatus.textContent = 'Above Target';
                attendanceStatus.className = 'status-text safe';
            } else if (overallAttendance >= 70) {
                attendanceStatus.textContent = 'Near Target';
                attendanceStatus.className = 'status-text warning';
            } else {
                attendanceStatus.textContent = 'Below Target';
                attendanceStatus.className = 'status-text danger';
            }
        }

        if (nextClassEl && nextClass) {
            nextClassEl.textContent = `Next: ${nextClass.subject} at ${nextClass.time}`;
        } else if (nextClassEl) {
            nextClassEl.textContent = 'No more classes today';
        }
    }

    // Calculate overall attendance
    calculateOverallAttendance() {
        let totalClasses = 0;
        let attendedClasses = 0;

        Object.keys(this.data.attendance).forEach(code => {
            const record = this.data.attendance[code];
            totalClasses += record.total;
            attendedClasses += record.attended;
        });

        return totalClasses > 0 ? Math.round((attendedClasses / totalClasses) * 100) : 0;
    }

    // Get today's classes based on current day
    getTodayClasses() {
        const today = new Date();
        const dayName = today.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        
        let timetableKey = '';
        if (dayName === 'monday' || dayName === 'tuesday') {
            timetableKey = 'monday-tuesday';
        } else if (dayName === 'wednesday' || dayName === 'thursday') {
            timetableKey = 'wednesday-thursday';
        } else if (dayName === 'friday' || dayName === 'saturday') {
            timetableKey = 'friday-saturday';
        }

        if (!timetableKey || !this.data.timetable[timetableKey]) {
            return [];
        }

        return Object.entries(this.data.timetable[timetableKey]).map(([time, classInfo]) => ({
            time,
            ...classInfo
        }));
    }

    // Get next class
    getNextClass() {
        const todayClasses = this.getTodayClasses();
        const now = new Date();
        const currentTime = now.getHours() * 100 + now.getMinutes();

        for (const classInfo of todayClasses) {
            const [startTime] = classInfo.time.split('-');
            const [hours, minutes] = startTime.split(':').map(Number);
            const classTime = hours * 100 + minutes;

            if (classTime > currentTime) {
                return {
                    subject: classInfo.subject,
                    time: startTime
                };
            }
        }

        return null;
    }

    // Get subjects with low attendance
    getLowAttendanceSubjects() {
        const lowAttendanceSubjects = [];
        
        Object.keys(this.data.attendance).forEach(code => {
            const record = this.data.attendance[code];
            const percentage = record.total > 0 ? (record.attended / record.total) * 100 : 0;
            if (percentage < 75) {
                lowAttendanceSubjects.push(code);
            }
        });

        return lowAttendanceSubjects;
    }

    // Calculate total safe bunks
    calculateTotalSafeBunks() {
        let totalSafeBunks = 0;
        
        Object.keys(this.data.attendance).forEach(code => {
            const record = this.data.attendance[code];
            const safeBunks = this.calculateSubjectSafeBunks(record, 75);
            totalSafeBunks += Math.max(0, safeBunks);
        });

        return totalSafeBunks;
    }

    // Calculate safe bunks for a subject
    calculateSubjectSafeBunks(record, targetPercentage) {
        if (record.total === 0) return 0;
        
        const currentPercentage = (record.attended / record.total) * 100;
        if (currentPercentage <= targetPercentage) return 0;

        let safeBunks = 0;
        let totalClasses = record.total;
        let attendedClasses = record.attended;

        while (true) {
            totalClasses++;
            const newPercentage = (attendedClasses / totalClasses) * 100;
            if (newPercentage < targetPercentage) break;
            safeBunks++;
        }

        return safeBunks;
    }

    // Load today's schedule
    loadTodaySchedule() {
        const todayClasses = this.getTodayClasses();
        const scheduleContainer = document.getElementById('todaySchedule');

        if (!scheduleContainer) return;

        if (todayClasses.length === 0) {
            scheduleContainer.innerHTML = '<div class="empty-state"><h3>No classes scheduled today</h3><p>Enjoy your free day!</p></div>';
            return;
        }

        scheduleContainer.innerHTML = todayClasses.map(classInfo => `
            <div class="schedule-item">
                <div class="schedule-item-info">
                    <h4>${classInfo.subject}</h4>
                    <p>${classInfo.code} - ${classInfo.faculty}</p>
                </div>
                <div class="schedule-time">${classInfo.time}</div>
            </div>
        `).join('');
    }

    // Update semester progress
    updateSemesterProgress() {
        const startDate = new Date(this.data.academicCalendar.semesterStart);
        const endDate = new Date(this.data.academicCalendar.semesterEnd);
        const currentDate = new Date();

        const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        const elapsedDays = Math.ceil((currentDate - startDate) / (1000 * 60 * 60 * 24));
        const remainingDays = Math.max(0, totalDays - elapsedDays);
        
        const progressPercentage = Math.min(100, Math.max(0, (elapsedDays / totalDays) * 100));
        const currentWeek = Math.ceil(elapsedDays / 7);

        const progressFill = document.getElementById('semesterProgress');
        const progressText = document.getElementById('progressText');
        const daysRemaining = document.getElementById('daysRemaining');

        if (progressFill) progressFill.style.width = `${progressPercentage}%`;
        if (progressText) progressText.textContent = `Week ${currentWeek} of 16 weeks`;
        if (daysRemaining) daysRemaining.textContent = `${remainingDays} days remaining`;
    }

    // Load upcoming events
    loadUpcomingEvents() {
        const eventsContainer = document.getElementById('upcomingEvents');
        if (!eventsContainer) return;

        const currentDate = new Date();
        const upcomingEvents = this.data.academicCalendar.events
            .filter(event => {
                const eventDate = new Date(event.date.split(' ')[0]);
                return eventDate >= currentDate;
            })
            .slice(0, 3);

        if (upcomingEvents.length === 0) {
            eventsContainer.innerHTML = '<div class="empty-state"><p>No upcoming events</p></div>';
            return;
        }

        eventsContainer.innerHTML = upcomingEvents.map(event => `
            <div class="event-item">
                <div class="event-name">${event.name}</div>
                <div class="event-date">${event.date}</div>
            </div>
        `).join('');
    }

    // Load timetable
    loadTimetable() {
        this.renderTimetableGrid();
        this.loadSubjectsInfo();
    }

    // Render timetable grid
    renderTimetableGrid() {
        const timetableGrid = document.getElementById('timetableGrid');
        if (!timetableGrid) return;

        const daySchedule = this.data.timetable[this.currentTimetableDay];
        if (!daySchedule) {
            timetableGrid.innerHTML = '<div class="empty-state"><p>No classes scheduled</p></div>';
            return;
        }

        const timeSlots = Object.keys(daySchedule).sort();
        
        timetableGrid.innerHTML = timeSlots.map(timeSlot => {
            const classInfo = daySchedule[timeSlot];
            return `
                <div class="time-slot">
                    <div class="slot-time">${timeSlot}</div>
                    <div class="slot-content">
                        <div class="class-info">
                            <h4>${classInfo.subject}</h4>
                            <div class="class-details">
                                <span class="class-code">${classInfo.code}</span>
                                <span class="class-type ${classInfo.type}">${classInfo.type.toUpperCase()}</span>
                            </div>
                            <p style="margin: 4px 0 0 0; font-size: 12px; color: var(--color-text-secondary);">${classInfo.faculty}</p>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Load subjects info
    loadSubjectsInfo() {
        const subjectsGrid = document.getElementById('subjectsGrid');
        if (!subjectsGrid) return;

        subjectsGrid.innerHTML = Object.entries(this.data.subjects).map(([code, subject]) => `
            <div class="subject-card">
                <div class="subject-header">
                    <div>
                        <h3 class="subject-name">${subject.name}</h3>
                        <div class="subject-code">${code}</div>
                    </div>
                </div>
                <div class="subject-stats">
                    <div class="stat-item">
                        <span>Faculty:</span>
                        <span class="stat-value">${subject.faculty}</span>
                    </div>
                    <div class="stat-item">
                        <span>Weekly Hours:</span>
                        <span class="stat-value">${subject.weeklyClasses}</span>
                    </div>
                    <div class="stat-item">
                        <span>Total Classes:</span>
                        <span class="stat-value">${subject.totalSemesterClasses}</span>
                    </div>
                    <div class="stat-item">
                        <span>Type:</span>
                        <span class="stat-value">${subject.type.toUpperCase()}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Load attendance
    loadAttendance() {
        this.updateAttendanceSummary();
        this.loadSubjectAttendance();
        this.loadTodayAttendance();
    }

    // Update attendance summary
    updateAttendanceSummary() {
        let totalClasses = 0;
        let attendedClasses = 0;

        Object.keys(this.data.attendance).forEach(code => {
            const record = this.data.attendance[code];
            totalClasses += record.total;
            attendedClasses += record.attended;
        });

        const overallPercentage = totalClasses > 0 ? Math.round((attendedClasses / totalClasses) * 100) : 0;

        const totalClassesEl = document.getElementById('totalClasses');
        const attendedClassesEl = document.getElementById('attendedClasses');
        const overallPercentageEl = document.getElementById('overallPercentage');

        if (totalClassesEl) totalClassesEl.textContent = totalClasses;
        if (attendedClassesEl) attendedClassesEl.textContent = attendedClasses;
        if (overallPercentageEl) overallPercentageEl.textContent = `${overallPercentage}%`;
    }

    // Load subject attendance
    loadSubjectAttendance() {
        const attendanceSubjects = document.getElementById('attendanceSubjects');
        if (!attendanceSubjects) return;

        attendanceSubjects.innerHTML = Object.entries(this.data.subjects).map(([code, subject]) => {
            const record = this.data.attendance[code];
            const percentage = record.total > 0 ? Math.round((record.attended / record.total) * 100) : 0;
            const minRequired = Math.ceil(record.total * 0.75);
            const maxBunks = record.total - minRequired;
            
            let statusClass = 'safe';
            if (percentage < 75) statusClass = 'danger';
            else if (percentage < 80) statusClass = 'warning';

            return `
                <div class="attendance-card">
                    <div class="attendance-header">
                        <div>
                            <h3>${subject.name}</h3>
                            <p style="margin: 0; font-size: 12px; color: var(--color-text-secondary);">${code}</p>
                        </div>
                        <div class="attendance-percentage ${statusClass}">${percentage}%</div>
                    </div>
                    <div class="attendance-progress">
                        <div class="attendance-progress-bar ${statusClass}" style="width: ${percentage}%"></div>
                    </div>
                    <div class="attendance-details">
                        <div class="detail-item">
                            <span>Attended:</span>
                            <span>${record.attended}/${record.total}</span>
                        </div>
                        <div class="detail-item">
                            <span>Required (75%):</span>
                            <span>${minRequired}</span>
                        </div>
                        <div class="detail-item">
                            <span>Max Bunks:</span>
                            <span>${maxBunks}</span>
                        </div>
                        <div class="detail-item">
                            <span>Safe Bunks:</span>
                            <span>${this.calculateSubjectSafeBunks(record, 75)}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Load today's attendance marking
    loadTodayAttendance() {
        const todayClasses = this.getTodayClasses();
        const todayAttendance = document.getElementById('todayAttendance');
        
        if (!todayAttendance) return;

        if (todayClasses.length === 0) {
            todayAttendance.innerHTML = '<div class="empty-state"><p>No classes to mark today</p></div>';
            return;
        }

        todayAttendance.innerHTML = todayClasses.map(classInfo => `
            <div class="attendance-item">
                <div>
                    <h4>${classInfo.subject}</h4>
                    <p>${classInfo.code} - ${classInfo.time}</p>
                </div>
                <div class="attendance-buttons">
                    <button class="btn-present" onclick="app.markAttendance('${classInfo.code}', 'present')">Present</button>
                    <button class="btn-absent" onclick="app.markAttendance('${classInfo.code}', 'absent')">Absent</button>
                </div>
            </div>
        `).join('');
    }

    // Mark attendance
    markAttendance(subjectCode, status) {
        const record = this.data.attendance[subjectCode];
        if (!record) return;

        record.total++;
        if (status === 'present') {
            record.attended++;
        }

        record.history.push({
            date: new Date().toISOString().split('T')[0],
            status: status
        });

        this.saveAttendanceData();
        this.updateDashboardStats();
        this.updateAttendanceSummary();
        this.loadSubjectAttendance();
        
        this.showNotification(`Marked ${status} for ${this.data.subjects[subjectCode].name}`, status === 'present' ? 'success' : 'error');
    }

    // Mark all present
    markAllPresent() {
        const todayClasses = this.getTodayClasses();
        todayClasses.forEach(classInfo => {
            this.markAttendance(classInfo.code, 'present');
        });
    }

    // Load bunk calculator
    loadBunkCalculator() {
        const targetAttendance = parseInt(document.getElementById('targetAttendance')?.value) || 75;
        this.updateBunkCalculations(targetAttendance);
        this.loadRecommendations();
    }

    // Update bunk calculations
    updateBunkCalculations(targetPercentage) {
        const bunkCalculations = document.getElementById('bunkCalculations');
        if (!bunkCalculations) return;

        bunkCalculations.innerHTML = Object.entries(this.data.subjects).map(([code, subject]) => {
            const record = this.data.attendance[code];
            const currentPercentage = record.total > 0 ? Math.round((record.attended / record.total) * 100) : 0;
            const safeBunks = this.calculateSubjectSafeBunks(record, targetPercentage);
            const classesNeeded = this.calculateClassesNeeded(record, targetPercentage);
            
            let statusClass = 'safe';
            let statusText = 'Safe';
            if (currentPercentage < targetPercentage) {
                statusClass = 'danger';
                statusText = 'Below Target';
            } else if (currentPercentage < targetPercentage + 5) {
                statusClass = 'warning';
                statusText = 'Near Target';
            }

            return `
                <div class="bunk-card">
                    <div class="bunk-header">
                        <div>
                            <h3>${subject.name}</h3>
                            <p style="margin: 0; font-size: 12px; color: var(--color-text-secondary);">${code}</p>
                        </div>
                        <div class="bunk-status ${statusClass}">${statusText}</div>
                    </div>
                    <div class="bunk-calculations-grid">
                        <div class="calculation-item">
                            <span>Current %:</span>
                            <span>${currentPercentage}%</span>
                        </div>
                        <div class="calculation-item">
                            <span>Safe Bunks:</span>
                            <span>${safeBunks}</span>
                        </div>
                        <div class="calculation-item">
                            <span>Classes Needed:</span>
                            <span>${classesNeeded}</span>
                        </div>
                        <div class="calculation-item">
                            <span>Attended:</span>
                            <span>${record.attended}/${record.total}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Calculate classes needed
    calculateClassesNeeded(record, targetPercentage) {
        const currentPercentage = record.total > 0 ? (record.attended / record.total) * 100 : 0;
        if (currentPercentage >= targetPercentage) return 0;

        let classesNeeded = 0;
        let totalClasses = record.total;
        let attendedClasses = record.attended;

        while (totalClasses === 0 || (attendedClasses / totalClasses) * 100 < targetPercentage) {
            totalClasses++;
            attendedClasses++;
            classesNeeded++;
            if (classesNeeded > 100) break; // Prevent infinite loop
        }

        return classesNeeded;
    }

    // Load recommendations
    loadRecommendations() {
        const recommendations = document.getElementById('recommendations');
        if (!recommendations) return;

        const recs = [];
        const lowAttendanceSubjects = this.getLowAttendanceSubjects();
        
        if (lowAttendanceSubjects.length > 0) {
            recs.push({
                icon: '⚠️',
                text: `You have ${lowAttendanceSubjects.length} subject(s) below 75% attendance. Focus on attending these classes.`
            });
        }

        const totalSafeBunks = this.calculateTotalSafeBunks();
        if (totalSafeBunks > 10) {
            recs.push({
                icon: '😊',
                text: `You have ${totalSafeBunks} safe bunks available. You're doing great!`
            });
        } else if (totalSafeBunks > 0) {
            recs.push({
                icon: '⚖️',
                text: `You have ${totalSafeBunks} safe bunks. Use them wisely.`
            });
        }

        if (recs.length === 0) {
            recs.push({
                icon: '📚',
                text: 'Keep maintaining regular attendance to stay above the minimum requirement.'
            });
        }

        recommendations.innerHTML = recs.map(rec => `
            <div class="recommendation-item">
                <div class="recommendation-icon">${rec.icon}</div>
                <div>${rec.text}</div>
            </div>
        `).join('');
    }

    // Load calendar
    loadCalendar() {
        this.loadSemesterTimeline();
        this.loadImportantDates();
    }

    // Load semester timeline
    loadSemesterTimeline() {
        const timeline = document.getElementById('semesterTimeline');
        if (!timeline) return;

        timeline.innerHTML = this.data.academicCalendar.events.map(event => `
            <div class="timeline-item">
                <div class="timeline-date">${event.date.split(' ')[0]}</div>
                <div class="timeline-content">
                    <h4>${event.name}</h4>
                    <p>${event.type === 'exam' ? 'Examination' : event.type === 'holiday' ? 'Holiday' : 'Event'}</p>
                    ${event.resultDate ? `<p style="font-size: 11px; margin-top: 4px;">Results: ${event.resultDate}</p>` : ''}
                </div>
            </div>
        `).join('');
    }

    // Load important dates
    loadImportantDates() {
        const importantDates = document.getElementById('importantDates');
        if (!importantDates) return;

        const dates = [
            { name: 'Semester Start', value: this.data.academicCalendar.semesterStart },
            { name: 'Classes End', value: this.data.academicCalendar.classesEnd },
            { name: 'End Sem Exam', value: this.data.academicCalendar.endSemExam }
        ];

        importantDates.innerHTML = dates.map(date => `
            <div class="date-item">
                <div class="date-name">${date.name}</div>
                <div class="date-value">${date.value}</div>
            </div>
        `).join('');
    }

    // Load analytics
    loadAnalytics() {
        setTimeout(() => {
            this.createLiveAttendanceChart();
            this.createProgressChart();
        }, 100);
    }

    // Create live attendance chart
    createLiveAttendanceChart() {
        const canvas = document.getElementById('liveAttendanceChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        if (this.attendanceChart) {
            this.attendanceChart.destroy();
        }

        const subjects = Object.keys(this.data.subjects).map(code => this.data.subjects[code].name);
        const attendanceData = Object.keys(this.data.subjects).map(code => {
            const record = this.data.attendance[code];
            return record.total > 0 ? Math.round((record.attended / record.total) * 100) : 0;
        });

        this.attendanceChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: subjects,
                datasets: [{
                    label: 'Attendance %',
                    data: attendanceData,
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C'],
                    borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Create progress chart
    createProgressChart() {
        const canvas = document.getElementById('progressChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        if (this.progressChart) {
            this.progressChart.destroy();
        }

        const weeks = Array.from({length: 16}, (_, i) => `Week ${i + 1}`);
        const progressData = weeks.map((_, i) => i < 4 ? (i + 1) * 25 : 0);

        this.progressChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: weeks,
                datasets: [{
                    label: 'Semester Progress',
                    data: progressData,
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // Handle quick actions
    handleQuickAction(action) {
        const quickMenu = document.getElementById('quickMenu');
        quickMenu.classList.add('hidden');

        switch(action) {
            case 'mark-present':
                this.markAllPresent();
                break;
            case 'mark-absent':
                this.showNotification('Select specific class to mark absent', 'info');
                break;
            case 'view-bunks':
                this.switchTab('bunk-calculator');
                break;
            case 'next-class':
                const nextClass = this.getNextClass();
                if (nextClass) {
                    this.showNotification(`Next class: ${nextClass.subject} at ${nextClass.time}`, 'info');
                } else {
                    this.showNotification('No more classes today', 'info');
                }
                break;
        }
    }

    // Show modal
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    // Hide modals
    hideModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
    }

    // Handle export
    handleExport() {
        const exportTypes = Array.from(document.querySelectorAll('input[name="exportType"]:checked')).map(cb => cb.value);
        const format = document.getElementById('exportFormat').value;
        
        let exportData = {
            studentInfo: this.data.studentInfo,
            exportDate: new Date().toISOString(),
            exportTypes: exportTypes
        };

        if (exportTypes.includes('attendance')) {
            exportData.attendance = this.data.attendance;
            exportData.attendanceSummary = {
                overall: this.calculateOverallAttendance(),
                subjects: Object.keys(this.data.subjects).map(code => ({
                    code,
                    name: this.data.subjects[code].name,
                    attendance: this.data.attendance[code]
                }))
            };
        }

        if (exportTypes.includes('timetable')) {
            exportData.timetable = this.data.timetable;
            exportData.subjects = this.data.subjects;
        }

        if (exportTypes.includes('calendar')) {
            exportData.calendar = this.data.academicCalendar;
        }

        // Create downloadable file
        const dataStr = JSON.stringify(exportData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mca-academic-data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.hideModals();
        this.showNotification('Data exported successfully!', 'success');
    }

    // Export calendar
    exportCalendar() {
        let icsContent = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//MCA Academic Planner//EN\n';
        
        // Add academic events
        this.data.academicCalendar.events.forEach(event => {
            const startDate = new Date(event.date.split(' ')[0]);
            icsContent += `BEGIN:VEVENT\n`;
            icsContent += `UID:${event.name.replace(/\s+/g, '')}@mca-planner.com\n`;
            icsContent += `DTSTART;VALUE=DATE:${startDate.toISOString().split('T')[0].replace(/-/g, '')}\n`;
            icsContent += `SUMMARY:${event.name}\n`;
            icsContent += `DESCRIPTION:${event.type}\n`;
            icsContent += `END:VEVENT\n`;
        });

        icsContent += 'END:VCALENDAR';

        const blob = new Blob([icsContent], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mca-academic-calendar.ics';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showNotification('Calendar exported successfully!', 'success');
    }

    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            background: var(--color-${type === 'success' ? 'success' : type === 'error' ? 'error' : 'primary'});
            color: white;
            border-radius: 8px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new MCAcademicPlanner();
});