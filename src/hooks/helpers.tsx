import dayjs from "dayjs";
import Swal from "sweetalert2";

// return total days with hours
export const getTimeDiff = (startDate: any, endDate: any, hoursAndDays: boolean) => {
    const msInHour = 1000 * 60 * 60;

    const abs = Math.abs(endDate - startDate) + 86400000;

    const totalHrs = Math.round(abs / msInHour);
    const totalDays = Math.round(totalHrs / 24);

    if (hoursAndDays) {
        // return totalHrs ? `${totalDays} days (${totalHrs} hours)` : 'n/a'
        return totalHrs ? `${totalDays} days (${totalDays * 8} hours)` : 'n/a'
    } else {
        return totalDays
    }
}

// checking past dates
export function isInThePast(date: any) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return date < today;
}

// checking is end date greater than startdate for timeoff
export function isEndDateGreaterThanStartDate(startDate: any, endDate: any) {
    const today = new Date(startDate);
    const endDateCon = new Date(endDate);

    return endDateCon < today;
}

// checking start date 5 days greater than today for timeoff
export function isStartDateGreaterThanToday(startDate: any) {
    const today = dayjs(startDate).format();
    const dateNow = dayjs().add(4, 'day').format();
    return today > dateNow;
}

// format amount
export const formatAmountNumberInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { type } = e.target;
    return (
        type === 'number' &&
        ['e', 'E', '+', '-'].includes(e.key) &&
        e.preventDefault()
    );
};

// fire error message
export const fireErrorModal = () => {
    Swal.fire({
        icon: 'error',
        title: 'No Vacation for you...',
        text: 'Not available to non-employees, interns and trial members!',
        confirmButtonText: 'OK',
        confirmButtonColor: '#C10206',
    })
}

export const customStyle = {
    control: (provided: any) => ({
        ...provided,
        height: 0,
        minHeight: '33px',
        padding: 0,
        margin: 0,
        marginLeft: 0,
        border: '0px solid black',
        fontSize: 16,
        backgroundColor: 'white',
        cursor: 'pointer',
        outline: 'none',
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#C10206' : 'transparent',
        color: state.isSelected ? 'white' : 'initial',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: state.isSelected ? '#C10206' : '#e5e7eb',
            color: state.isSelected ? 'white' : 'initial',
        },
    }),
};


export const editorModules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        // ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"]
    ]
}

export const editiorFormats = [
    'header',
    'color', 'background',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]