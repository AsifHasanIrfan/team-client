import { BsBriefcase, BsFileEarmarkText } from 'react-icons/bs';

export const sidebarMenuLinks = [
  {
    id: 1,
    icon: <BsBriefcase />,
    text: 'All Jobs',
    url: '/dashboard/marketplace',
  },
  {
    id: 2,
    icon: <BsFileEarmarkText />,
    text: 'My Application',
    url: '/dashboard/marketplace/my-application',
  },
];

export const budgetRangeFilterData = {
  title: 'Budget Range',
  data: [
    {
      id: 1,
      text: '$30,000 - $50,000',
      value: '',
    },
    {
      id: 2,
      text: '$10,000 - $20,000',
      value: '',
    },
    {
      id: 3,
      text: '$0 - $500',
      value: '',
    },
  ],
};

export const categoryFilterData = {
  title: 'Project Category',
  data: [
    // {
    //   id: 1,
    //   text: 'All',
    //   value: '',
    // },
    {
      id: 2,
      text: 'UI/UX design',
      value: 'uiux',
    },
    {
      id: 3,
      text: 'React.js',
      value: 'react',
    },
    {
      id: 4,
      text: 'Wordpress',
      value: 'wordpress',
    },
    {
      id: 5,
      text: 'Full-Stack Dev',
      value: 'fullstack',
    },
    {
      id: 6,
      text: 'Graphic design',
      value: 'graphic',
    },
    {
      id: 7,
      text: 'Social Media',
      value: 'social',
    },
    {
      id: 8,
      text: 'Other',
      value: 'other',
    },
  ],
};

export const myApplicationTabData = [
  {
    id: 1,
    text: 'Bids',
  },
  {
    id: 2,
    text: 'Current Jobs',
  },
  {
    id: 3,
    text: 'Past Projects',
  },
];

export const tabActiveStyle =
  'text-lightHover border-lightHover border-b-[2px]';

export const marketplceTableData = [
  {
    id: 1,
    projectName: 'Web UI And UX Designer need',
    yourPosition: '1st',
    myBids: '150 DG',
    time: '2 hr ago',
  },
  {
    id: 2,
    projectName: 'UI Designer',
    yourPosition: '2nd',
    myBids: '100 DG',
    time: '5 hr ago',
  },
  {
    id: 3,
    projectName: 'Reveler Prototyping Project',
    yourPosition: '3rd',
    myBids: '60 DG',
    time: '1 day ago',
  },
];
export const biddingTableData = [
  {
    id: 1,
    liveBidding: '1st Place',
    name: 'Chandan k',
    biddingAmount: '50 DG Coin',
    time: '12 min ago',
  },
  {
    id: 2,
    liveBidding: '2nd Place',
    name: 'Habib S',
    biddingAmount: '20 DG Coin',
    time: '2 hr ago',
  },
  {
    id: 2,
    liveBidding: '3rd Place',
    name: 'Jewel R (You)',
    biddingAmount: '10 DG Coin',
    time: '1 day ago',
  },
];

export const paymentMethodOptions = [
  {
    value: 'select',
    label: 'Select',
    message: 'select',
  },
  {
    value: 'fiverr',
    label: 'Fiverr',
    message: 'fiverr',
  },
  {
    value: 'upwork',
    label: 'Upwork',
    message: 'upwork',
  },
  {
    value: 'localBank',
    label: 'Local Bank',
    message: 'localBank',
  },
];

export const selectInputStyle = {
  control: (provided: any) => ({
    ...provided,
    border: '1px solid ##E0E0E0',
    padding: '5px 10px',
    borderRadius: '8px',
    color: '#6D6D6D',
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
