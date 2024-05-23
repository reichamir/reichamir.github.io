const SHIFTS_DAYS_DURATION = 7;
const TEAM = [
    {
        name: 'Amir Reich',
        phone: '0546910610',
    },
    {
        name: 'Nissim Ren Cohen',
        phone: '0523066578',
    },
    {
        name: 'Oron Evron',
        phone: '0523387767',
    },
    {
        name: 'Ran German',
        phone: '0523615737',
    },
    {
        name: 'Sapir Madmon Danino',
        phone: '0503405093',
    },
];
const FIRST_SHIFT_DATE = new Date('2024-01-01');

window.onload = () => {
    function getShiftDates() {
        const today = new Date(); 
        const toDate = new Date(today)
        toDate.setDate(today.getDate() + SHIFTS_DAYS_DURATION);
        let shiftDate = new Date(today);
        const dates = []
    
        while (shiftDate < toDate) {
            dates.push(shiftDate)
            
            shiftDate = new Date(shiftDate)
            shiftDate.setDate(shiftDate.getDate() + 1);
        }
    
        return dates
    }
    
    function renderDaysHeader() {
        const calendarHeader = document.getElementById('calendarHeader');
        const headerRow = document.createElement('tr');
        calendarHeader.appendChild(headerRow);
    
        shiftDates.forEach(shiftDate => {
            const dayName = shiftDate.toLocaleDateString('en-US', { weekday: 'short' });
            const month = shiftDate.getMonth() + 1
            const dayOfMonth = shiftDate.getDate()
    
            const cell = document.createElement('th');
            cell.textContent = `${dayName} (${dayOfMonth}/${month})`;
            headerRow.appendChild(cell);
        })
    }
    
    function renderShiftsPlaceholders() {
        const teamMembersCount = TEAM.length;
        const daysDuration = shiftDates.length;
    
        const calendarBody = document.getElementById('calendarBody');
    
        for (let rowIndex = 0; rowIndex < teamMembersCount; rowIndex++) {
            const memberRow = document.createElement('tr');
            calendarBody.appendChild(memberRow);
    
            for (let cellIndex = 0; cellIndex < daysDuration; cellIndex++) {
                const dayCell = document.createElement('td');
                memberRow.appendChild(dayCell);
            }
        }
    }
    
    function renderShifts() {
        shiftDates.forEach((shiftDate, shiftDayIndex) => {
            const shiftMemebers = getShiftMemebrs(shiftDate)
    
            renderShiftMembers({shiftMemebers, shiftDayIndex})
        })
    }
    
    function getShiftMemebrs(shiftDate) {
        const daysDiff = Math.floor((shiftDate - FIRST_SHIFT_DATE) / (1000 * 60 * 60 * 24)); 
        let firstPersonIndex = daysDiff % TEAM.length;
    
        return [...TEAM.slice(firstPersonIndex), ...TEAM.slice(0, firstPersonIndex)];
    }
    
    function renderShiftMembers({shiftMemebers, shiftDayIndex}) {
        const calendarBody = document.getElementById('calendarBody');
    
        shiftMemebers.forEach((shiftMember, shiftMemberIndex) => {
            calendarBody.rows[shiftMemberIndex].cells[shiftDayIndex].textContent = shiftMember.name
        })
    }

    function renderTeamMembersDetails() {
        const teamMembersBody = document.getElementById('teamMembersBody');
        
        TEAM.forEach(teamMember => {
            const memberRow = document.createElement('tr');
            teamMembersBody.appendChild(memberRow);

            const nameCell = document.createElement('td');
            nameCell.textContent = teamMember.name;
            memberRow.appendChild(nameCell);

            const phoneCell = document.createElement('td');
            phoneCell.textContent = teamMember.phone;
            memberRow.appendChild(phoneCell);
        })
    }

    const shiftDates = getShiftDates();

    renderDaysHeader();
    renderShiftsPlaceholders();
    renderShifts();

    renderTeamMembersDetails();
}