import BehanceIcon from '@components/Icons/BehanceIcon';
import BenifitsIcon from '@components/Icons/BenifitsIcon';
import ClockIcon from '@components/Icons/ClockIcon';
import DashboardCalenderIcon from '@components/Icons/DashboardCalenderIcon';
import DribbleIcon from '@components/Icons/DribbleIcon';
import Facebook from '@components/Icons/Facebook';
import HomeIcon from '@components/Icons/HomeIcon';
import JobIcon from '@components/Icons/JobIcon';
import LinkedIn from '@components/Icons/LinkedIn';
import MarketplaceIcon from '@components/Icons/MarketplaceIcon';
import ProfileIcon from '@components/Icons/ProfileIcon';
import ReportIcon from '@components/Icons/ReportIcon';
import RewardsIcon from '@components/Icons/RewardsIcon';
import SaleryIcon from '@components/Icons/SaleryIcon';
import TaskIcon from '@components/Icons/TaskIcon';
import TeamIcon from '@components/Icons/TeamIcon';
import Twitter from '@components/Icons/Twitter';
import Whatsapp from '@components/Icons/Whatsapp';
import {
  addUserDesignationDatasType,
  AllDashboardLinkType,
  AvailableBenefitsype,
  CareerDataType,
  careerOptionsDataType,
  clientSildeDataType,
  countryOptionsDataType,
  currentEmployeeOfTheMonthDataType,
  DailyTokenDataType,
  dashboardNotificationCardDataType,
  DashboardSidebarLink,
  DashBoardSocialLinkType,
  DrawbackDataType,
  DrawbackTypes,
  FooterLink,
  GotBenefitsType,
  homeNavProps,
  leaderboardBadgeCardDataType,
  leaderboardSelectDataType,
  MyRewardDataType,
  paymentMethodDataType,
  PortfolioInput,
  ProfileDetailType,
  RequestPageType,
  RequestsDataType,
  settingInformationDataTypeProps,
  SkillsProps,
  SocialLink,
  TaskDataType,
  theadDatasType,
  timeOffUpcomingDataType,
} from '@config/types';
import PasswordRequest from '@views/Requests/components/PasswordRequest';
import RequestsTimeOf from '@views/Requests/components/RequestsTimeOf';
import UserInfoRequests from '@views/Requests/components/UserInfoRequests';
import classnames from 'classnames';
import { BiGitPullRequest } from 'react-icons/bi';
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';
import { HiOutlineUserAdd } from 'react-icons/hi';

export const cx = classnames;

export const facebookUrl = 'https://www.facebook.com/greggdigital';
export const twitterUrl = 'https://twitter.com/digital_gregg';
export const linkedinUrl = 'https://www.linkedin.com/company/digitalgregg';
export const whatsappUrl = 'https://api.whatsapp.com/send?phone=8801851590694';
export const instagramUrl = 'https://www.instagram.com/digital_gregg';

export const contactPageSocialLinks: SocialLink[] = [
  {
    icon: <Facebook />,
    url: facebookUrl,
  },
  {
    icon: <Twitter />,
    url: twitterUrl,
  },
  {
    icon: <LinkedIn />,
    url: linkedinUrl,
  },
  {
    icon: <Whatsapp />,
    url: whatsappUrl,
  },
];

export const icons = {
  facebook: <Facebook />,
};

export const mySocialLinks: SocialLink[] = [
  {
    icon: <Facebook />,
    url: facebookUrl,
  },
  {
    icon: <LinkedIn />,
    url: linkedinUrl,
  },
  {
    icon: <DribbleIcon />,
    url: whatsappUrl,
  },
  {
    icon: <BehanceIcon />,
    url: whatsappUrl,
  },
];

export const footerSocialLinks: SocialLink[] = [
  {
    icon: <BsFacebook size={21} />,
    url: facebookUrl,
  },
  {
    icon: <BsTwitter size={21} />,
    url: twitterUrl,
  },
  {
    icon: <BsInstagram size={21} />,
    url: instagramUrl,
  },
  {
    icon: <BsLinkedin size={21} />,
    url: linkedinUrl,
  },
];

export const footerQuickLinks: FooterLink[] = [
  {
    text: 'DigitalGregg',
    url: '/',
  },
  {
    text: 'Jobs',
    url: '/jobs',
  },
  {
    text: 'Contact',
    url: '/contact-us',
  },
];
export const footerLegalLinks: FooterLink[] = [
  {
    text: 'Privacy Policy',
    url: '/privacy-policy',
  },
  {
    text: 'Terms & Conditions',
    url: '/terms-conditions',
  },
];

export const dashboardSidebarLinks: DashboardSidebarLink[] = [
  {
    icon: <HomeIcon />,
    url: '/dashboard',
    text: 'Dashboard',
    pageTitle: 'Dashboard',
  },
  {
    icon: <ProfileIcon />,
    url: '/dashboard/profile',
    text: 'My Profile',
    pageTitle: 'My Profile',
  },
  {
    icon: <TaskIcon />,
    url: '/dashboard/tasks',
    text: 'Task',
    pageTitle: 'Task',
  },
  {
    icon: <SaleryIcon />,
    url: '/dashboard/salary',
    text: 'Salary',
    pageTitle: 'Salary',
  },
  {
    icon: <DashboardCalenderIcon />,
    url: '/dashboard/event',
    text: 'Event',
    pageTitle: 'Event',
  },
  {
    icon: <ClockIcon />,
    url: '/dashboard/timeoff',
    text: 'Time off',
    pageTitle: 'Time off',
  },
  {
    icon: <RewardsIcon />,
    url: '/dashboard/rewards',
    text: 'Rewards',
    pageTitle: 'Rewards',
  },
  {
    icon: <BenifitsIcon />,
    url: '/dashboard/benefits',
    text: 'Benefits',
    pageTitle: 'Benefits',
  },
  {
    icon: <TeamIcon />,
    url: '/dashboard/team',
    text: 'Team',
    pageTitle: 'Team Members',
  },
  {
    icon: <MarketplaceIcon />,
    url: '/dashboard/marketplace',
    text: 'Marketplace',
    pageTitle: 'Marketplace',
  },
  {
    icon: <ReportIcon />,
    url: '/dashboard/report',
    text: 'Report',
    pageTitle: 'Report',
  },
  {
    icon: <HiOutlineUserAdd size={30} />,
    url: '/dashboard/add-user',
    text: 'Add user',
    pageTitle: 'Add User',
    forAdmin: true,
  },
  {
    icon: <BiGitPullRequest size={30} />,
    url: '/dashboard/requests',
    text: 'Requests',
    pageTitle: 'Requests',
    forAdmin: true,
  },
  {
    icon: <BenifitsIcon />,
    url: '/dashboard/add-benefits',
    text: 'Add Benefits',
    pageTitle: 'Add Benefits',
    forAdmin: true,
  },
  {
    icon: <ProfileIcon />,
    url: '/dashboard/users',
    text: 'Users',
    pageTitle: 'Users Management',
    forAdmin: true,
  },
  {
    icon: <RewardsIcon />,
    url: '/dashboard/users-salary',
    text: 'Users Salary',
    pageTitle: 'Users Salary',
    forAdmin: true,
  },
  // {
  //   icon: <ReportIcon />,
  //   url: '/dashboard/privacy-policy',
  //   text: 'Privacy & Policy',
  //   pageTitle: 'Privacy & Policy',
  //   forAdmin: true,
  // },
  {
    icon: <DashboardCalenderIcon />,
    url: '/dashboard/contact',
    text: 'Ticket',
    pageTitle: 'Ticket',
    forAdmin: true,
  },
  {
    icon: <ClockIcon />,
    url: '/dashboard/job',
    text: 'Job',
    pageTitle: 'Job',
    forAdmin: true,
  },
  {
    icon: <JobIcon />,
    url: '/dashboard/admin-marketplace',
    text: 'Admin Marketplace',
    pageTitle: 'Marketplace',
    forAdmin: true,
  },
];
export const outOfdashboardSideBarLinks: AllDashboardLinkType[] = [
  {
    url: '/dashboard/settings',
    text: 'Settings',
    pageTitle: 'Settings',
  },
  {
    url: '/dashboard/notifications',
    text: 'Notifications',
    pageTitle: 'Notifications',
  },
  {
    url: '/dashboard/user/[id]',
    text: 'UserProfile',
    pageTitle: 'User Profile',
  },
  {
    url: '/dashboard/marketplace/[id]',
    text: 'Apply Job',
    pageTitle: 'Apply Job',
  },
  {
    url: '/dashboard/users/reports',
    text: 'Reports',
    pageTitle: 'Reports',
  },
  {
    url: '/dashboard/attendance',
    text: 'Attendance',
    pageTitle: 'Attendance',
  },
];

export const profileDetails: ProfileDetailType[] = [
  {
    label: 'Full Name:',
    value: 'Rasel Bishwash',
  },
  {
    label: 'User Name:',
    value: 'Admin230',
  },
  {
    label: 'Phone Number:',
    value: '+880162816255',
  },
  {
    label: 'Address:',
    value: 'Lakshmipur, Chittagong, Bangladesh',
  },
  {
    label: 'Role:',
    value: 'UI UX Designer',
  },
  {
    label: 'Years of Experience:',
    value: '3 Years',
  },
];

export const taskData: TaskDataType[] = [
  {
    id: 1,
    title: 'Website redesign',
    dueDate: '07 Aug 2022',
    dueTime: '02:00 pm',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    status: 'inprogress',
    dgCoin: 0,
  },
  {
    id: 2,
    title: 'Need UI for a app',
    dueDate: '08 Aug 2022',
    dueTime: '01:00 pm',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    status: 'assigned',
    dgCoin: 0,
  },
  {
    id: 3,
    title: 'Need UI for a app',
    dueDate: '06 Aug 2022',
    dueTime: '01:00 pm',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    status: 'lateTask',
    dgCoin: 0,
  },
  {
    id: 4,
    title: 'App design',
    dueDate: '05 Aug 2022',
    dueTime: '01:00 pm',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit...',
    status: 'assigned',
    dgCoin: 0,
  },
  {
    id: 5,
    title: 'Need UI for a app',
    dueDate: '06 Aug 2022',
    dueTime: '01:00 pm',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    status: 'completed',
    dgCoin: 0,
  },
  {
    id: 6,
    title: 'App design',
    dueDate: '05 Aug 2022',
    dueTime: '01:00 pm',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    status: 'completed',
    dgCoin: 0,
  },
  {
    id: 7,
    title: 'Need UI for a app',
    dueDate: '06 Aug 2022',
    dueTime: '01:00 pm',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    status: 'completed',
    dgCoin: 0,
  },
  {
    id: 8,
    title: 'App design',
    dueDate: '05 Aug 2022',
    dueTime: '01:00 pm',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    status: 'lateTask',
    dgCoin: 0,
  },
  {
    id: 9,
    title: 'App design',
    dueDate: '05 Aug 2022',
    dueTime: '01:00 pm',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    status: 'completed,',
    dgCoin: 0,
  },
  {
    id: 10,
    title: 'Need UI for a app',
    dueDate: '05 Aug 2022',
    dueTime: '01:00 pm',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    status: 'completed',
    dgCoin: 0,
  },
  {
    id: 11,
    title: 'App design',
    dueDate: '05 Aug 2022',
    dueTime: '01:00 pm',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    status: 'lateTask',
    dgCoin: 0,
  },
];

export const requestsData: RequestsDataType[] = [
  {
    id: 1,
    dueDate: '07 Aug 2022',
    dueTime: '02:00 pm',
    userName: 'Blank',
  },
  {
    id: 2,
    dueDate: '08 Aug 2022',
    dueTime: '01:00 pm',
    userName: 'Blank',
  },
  {
    id: 3,
    dueDate: '06 Aug 2022',
    dueTime: '01:00 pm',
    userName: 'Blank',
  },
  {
    id: 4,
    dueDate: '05 Aug 2022',
    dueTime: '01:00 pm',
    userName: 'Blank',
  },
  {
    id: 5,
    dueDate: '06 Aug 2022',
    dueTime: '01:00 pm',
    userName: 'Blank',
  },
  {
    id: 6,
    dueDate: '05 Aug 2022',
    dueTime: '01:00 pm',
    userName: 'Blank',
  },
  {
    id: 7,
    dueDate: '06 Aug 2022',
    dueTime: '01:00 pm',
    userName: 'Blank',
  },
  {
    id: 8,
    dueDate: '05 Aug 2022',
    dueTime: '01:00 pm',
    userName: 'Blank',
  },
  {
    id: 9,
    dueDate: '05 Aug 2022',
    dueTime: '01:00 pm',
    userName: 'Blank',
  },
  {
    id: 10,
    dueDate: '05 Aug 2022',
    dueTime: '01:00 pm',
    userName: 'Blank',
  },
  {
    id: 11,
    dueDate: '05 Aug 2022',
    dueTime: '01:00 pm',
    userName: 'Blank',
  },
];
export const userInfoRequestData = [
  {
    id: 1,
    fullName: 'Redwan Ahmed',
    userName: 'redwan',
    email: 'red1.web3@gmail.com',
  },
  {
    id: 2,
    fullName: 'Redwan Ahmed',
    userName: 'redwan',
    email: 'red1.web3@gmail.com',
  },
  {
    id: 3,
    fullName: 'Redwan Ahmed',
    userName: 'redwan',
    email: 'red1.web3@gmail.com',
  },
  {
    id: 4,
    fullName: 'Redwan Ahmed',
    userName: 'redwan',
    email: 'red1.web3@gmail.com',
  },
  {
    id: 5,
    fullName: 'Redwan Ahmed',
    userName: 'redwan',
    email: 'red1.web3@gmail.com',
  },
  {
    id: 6,
    fullName: 'Redwan Ahmed',
    userName: 'redwan',
    email: 'red1.web3@gmail.com',
  },
  {
    id: 7,
    fullName: 'Redwan Ahmed',
    userName: 'redwan',
    email: 'red1.web3@gmail.com',
  },
  {
    id: 8,
    fullName: 'Redwan Ahmed',
    userName: 'redwan',
    email: 'red1.web3@gmail.com',
  },
  {
    id: 9,
    fullName: 'Redwan Ahmed',
    userName: 'redwan',
    email: 'red1.web3@gmail.com',
  },
  {
    id: 10,
    fullName: 'Redwan Ahmed',
    userName: 'redwan',
    email: 'red1.web3@gmail.com',
  },
  {
    id: 11,
    fullName: 'Redwan Ahmed',
    userName: 'redwan',
    email: 'red1.web3@gmail.com',
  },
];

export const careerData: CareerDataType[] = [
  {
    name: 'Need UI designer',
    vacancy: '2 Person need',
    type: 'Remotely',
    link: '#',
  },
  {
    name: 'Need UX designer',
    vacancy: '2 Person need',
    type: 'Remotely',
    link: '#',
  },
];

export const BenefitsData: AvailableBenefitsype[] = [
  {
    title: 'Freepik premium account',
    img: '/images/benefits/1.png',
    description:
      'Digital Gregg Provide you a personal freepik personal account for 90 days.',
    date: 'Unlocked in September 23, 2022',
  },
  {
    title: 'Office Tour to Maldives',
    img: '/images/benefits/2.png',
    description:
      'I am here to anticipate clearly about the important requirements of our users.',
    date: 'Unlocked in September 23, 2022',
  },
  {
    title: 'Office Tour to Bangladesh',
    img: '/images/benefits/3.png',
    description:
      'I am here to anticipate clearly about the important requirements of our users.',
    date: 'Unlocked in September 23, 2022',
  },
  {
    title: 'Your salary',
    img: '/images/benefits/4.png',
    description: 'Increase your salary $5 per hour',
    date: 'Unlocked in September 23, 2022',
  },
  {
    title: 'Office Tour to Bangladesh',
    img: '/images/benefits/5.png',
    description:
      'I am here to anticipate clearly about the important requirements of our users.',
    date: 'Unlocked in September 23, 2022',
  },
];

export const GotBenefitsData: GotBenefitsType[] = [
  {
    title: 'Freepik premium account for 30 Days',
    img: '/images/benefits/6.png',
    date: '10 May 2022',
  },
  {
    title: 'envato elements subscription for 1 month.',
    img: '/images/benefits/10.png',
    date: '15 June 2022',
  },
  {
    title: 'Ui8.net subscription for 1 month.',
    img: '/images/benefits/8.png',
    date: '15 July2022',
  },
  {
    title: 'Office Tour to Maldives',
    img: '/images/benefits/9.png',
    date: '24 August 2022',
  },
  {
    title: 'Office Tour to Bangladesh',
    img: '/images/benefits/10.png',
    date: '13 September 2022',
  },
  {
    title: 'Increased your salary $5 per hour',
    img: '/images/benefits/11.png',
    date: '12 Octomber 2022',
  },
  {
    title: 'Increased your salary $5 per hour',
    img: '/images/benefits/11.png',
    date: '12 Octomber 2022',
  },
];

export const myRewardData: MyRewardDataType[] = [
  {
    image: '/images/rewards/reward-4.svg',

    title: 'Employee of the month',
    duration: 'June 2022',
    reward: 280,
  },
  {
    image: '/images/rewards/reward-5.svg',
    title: 'Extra Work',
    duration: '3:21:03 hours',
    reward: 77.37,
  },
  {
    image: '/images/rewards/reward-4.svg',
    title: 'Employee of the month',
    duration: 'June 2022',
    reward: 280,
  },
  {
    image: '/images/rewards/reward-5.svg',
    title: 'Extra Work',
    duration: '3:21:03 hours',
    reward: 77.37,
  },
];

export const dailyTokenData: DailyTokenDataType[] = [
  {
    title: 'Create a user flow',
    point: 60,
    status: 'completed',
  },
  {
    title: 'Create a user flow',
    point: 60,
    status: 'completed',
  },
  {
    title: 'Create a user flow',
    point: 60,
    status: 'assigned',
  },
  {
    title: 'Create a user flow',
    point: 60,
    status: 'inprogress',
  },
];

export const drawbackData: DrawbackDataType[] = [
  {
    image: '/images/drawbacks/clock.svg',
    name: 'Late Meeting',
    date: '07 Aug 2022',
    payment: '-$23.11',
  },
  {
    image: '/images/drawbacks/calender.svg',
    name: 'Missed Day',
    date: '07 Aug 2022',
    payment: '-$23.11',
  },
  {
    image: '/images/drawbacks/brief.svg',
    name: 'No Work',
    date: '07 Aug 2022',
    payment: '-$23.11',
  },
  {
    image: '/images/drawbacks/clock.svg',
    name: 'Late Meeting',
    date: '07 Aug 2022',
    payment: '-$23.11',
  },
  {
    image: '/images/drawbacks/calender.svg',
    name: 'Missed Day',
    date: '07 Aug 2022',
    payment: '-$23.11',
  },
  {
    image: '/images/drawbacks/brief.svg',
    name: 'No Work',
    date: '07 Aug 2022',
    payment: '-$23.11',
  },
];

export const timeOffUpcomingData: timeOffUpcomingDataType[] = [
  {
    startDate: '07 Aug 2022',
    endDate: '09 Aug 2022',
    type: 'Time off',
    totalTime: {
      day: '2 days',
      hour: '(48 hours)',
    },

    status: 'approved',
    statusTite: 'Approved',
  },
  {
    startDate: '07 Aug 2022',
    endDate: '09 Aug 2022',
    type: 'Time off',
    totalTime: {
      day: '2 days',
      hour: '(48 hours)',
    },

    status: 'approved',
    statusTite: 'Approved',
  },
  {
    startDate: '07 Aug 2022',
    endDate: '09 Aug 2022',
    type: 'Time off',
    totalTime: {
      day: '2 days',
      hour: '(48 hours)',
    },

    status: 'approved',
    statusTite: 'Approved',
  },
  {
    startDate: '07 Aug 2022',
    endDate: '09 Aug 2022',
    type: 'Time off',
    totalTime: {
      day: '2 days',
      hour: '(48 hours)',
    },

    status: 'approved',
    statusTite: 'Approved',
  },
  {
    startDate: '07 Aug 2022',
    endDate: '09 Aug 2022',
    type: 'Time off',
    totalTime: {
      day: '2 days',
      hour: '(48 hours)',
    },

    status: 'approved',
    statusTite: 'Approved',
  },
  {
    startDate: '07 Aug 2022',
    endDate: '09 Aug 2022',
    type: 'Time off',
    totalTime: {
      day: '2 days',
      hour: '(48 hours)',
    },

    status: 'approved',
    statusTite: 'Approved',
  },
];

export const notificationData: dashboardNotificationCardDataType[] = [
  {
    content: 'Packing Associate shift has been finished',
    isRead: false,
    url: 'https://',
  },
  {
    content: 'It is a long established fact that a reader will be distracted.',
    isRead: true,
    url: 'https://',
  },
  {
    content: 'I can communicate ideas my special design',
    isRead: true,
    url: 'https://',
  },
];

export const skillsData: SkillsProps = {
  designer: [
    'UI UX designer',
    'Adobe Photoshop',
    'Figma',
    'Adobe XD',
    'Adobe Illustrator',
    'Sketech',
    'Adobe premiere pro',
    'After effects',
    'Invison',
  ],
  developer: [
    'HTML/CSS',
    'Javascript',
    'React js',
    'Next js',
    'Typescript',
    'Tailwind CSS',
    'Firebase',
    'Mongo DB',
    'Node js',
    'PHP',
    'Java',
    'Python',
  ],
  marketing: [
    'SEO',
    'SMM',
    'Email Marketing',
    'Video Marketing',
    'SEM',
    'Content Marketing',
    'Data / Analytics',
    'CRO',
  ],
  virtualAssistent: [
    'Communication Skills',
    'Project Management',
    'Time Management',
  ],
  PR: ['Communication', 'Team management', 'Organization', 'Negotiation'],
};

export const portfolioInpData: PortfolioInput[] = [
  {
    name: 'website',
    label: 'Personal Website',
  },
  {
    name: 'dribble',
    label: 'Dribbble URL',
  },
  {
    name: 'behance',
    label: 'Behance URL',
  },
  {
    name: 'uplabs',
    label: 'Uplabs URL',
  },
  {
    name: 'github',
    label: 'GitHub',
  },
];

export const AddressData: PortfolioInput[] = [
  {
    name: 'location',
    label: 'Location',
    placeholder: 'Bangladesh',
  },
  {
    name: 'city',
    label: 'City',
    placeholder: 'Dhaka',
  },
  {
    name: 'state',
    label: 'State',
    placeholder: 'Gazipur',
  },
  {
    name: 'zip',
    label: 'Zip Code',
    placeholder: '3661',
  },
];

export const PersonalData: PortfolioInput[] = [
  {
    name: 'fullname',
    label: 'Your Full Name',
    placeholder: 'Gregg',
  },
  {
    name: 'email',
    label: 'Your Email Address',
    placeholder: 'digitalgregg@gmail.com',
  },
  {
    name: 'phone',
    label: 'Your Phone Number',
    placeholder: '(+123) 456 789 88',
  },
];

export const careerDataTwo: CareerDataType[] = [
  {
    name: 'ReactJS',
    vacancy: '2 Person need',
    type: 'Remotely',
    link: '#',
  },
  {
    name: 'Javascript',
    vacancy: '2 Person need',
    type: 'Remotely',
    link: '#',
  },
];

export const LeaderBoardData = [
  {
    id: 1,
    name: 'Tanisha M. Cooke',
    designation: 'Web Developer',
    description:
      'I am here to anticipate clearly about the important requirements of our users.',
    is_active: true,
    project_activity: 70,
    email: 'raihanhosen011@gmail.com',
    avatar: '/images/leaderboard/profile-1.jpg',
    social: {
      facebook: 'https://www.facebook.com/',
      linkedin: 'https://www.facebook.com/',
      dribble: 'https://www.facebook.com/',
      behance: 'https://www.facebook.com/',
    },
  },
  {
    id: 2,
    name: 'Tanisha M. Cooke',
    designation: 'UI/UX designer',
    description:
      'I am here to anticipate clearly about the important requirements of our users.',
    is_active: false,
    project_activity: 72,
    email: 'raihanhosen011@gmail.com',
    avatar: '/images/leaderboard/profile-2.jpg',
    social: {
      facebook: 'https://www.facebook.com/',
      linkedin: 'https://www.facebook.com/',
      dribble: 'https://www.facebook.com/',
      behance: 'https://www.facebook.com/',
    },
  },
  {
    id: 3,
    name: 'Tanisha M. Cooke',
    designation: 'UI/UX designer',
    description:
      'I am here to anticipate clearly about the important requirements of our users.',
    is_active: true,
    project_activity: 24,
    email: 'raihanhosen011@gmail.com',
    avatar: '/images/leaderboard/profile-3.jpg',
    social: {
      facebook: 'https://www.facebook.com/',
      linkedin: 'https://www.facebook.com/',
      dribble: 'https://www.facebook.com/',
      behance: 'https://www.facebook.com/',
    },
  },
  {
    id: 4,
    name: 'Tanisha M. Cooke',
    designation: 'UI/UX designer',
    description:
      'I am here to anticipate clearly about the important requirements of our users.',
    is_active: true,
    project_activity: 32,
    email: 'raihanhosen011@gmail.com',
    avatar: '/images/leaderboard/profile-4.jpg',
    social: {
      facebook: 'https://www.facebook.com/',
      linkedin: 'https://www.facebook.com/',
      dribble: 'https://www.facebook.com/',
      behance: 'https://www.facebook.com/',
    },
  },
  {
    id: 5,
    name: 'Tanisha M. Cooke',
    designation: 'Web Developer',
    description:
      'I am here to anticipate clearly about the important requirements of our users.',
    is_active: true,
    project_activity: 43,
    email: 'raihanhosen011@gmail.com',
    avatar: '/images/leaderboard/profile-5.jpg',
    social: {
      facebook: 'https://www.facebook.com/',
      linkedin: 'https://www.facebook.com/',
      dribble: 'https://www.facebook.com/',
      behance: 'https://www.facebook.com/',
    },
  },
  {
    id: 6,
    name: 'Tanisha M. Cooke',
    designation: 'UI/UX designer',
    description:
      'I am here to anticipate clearly about the important requirements of our users.',
    is_active: true,
    project_activity: 57,
    email: 'raihanhosen011@gmail.com',
    avatar: '/images/leaderboard/profile-6.jpg',
    social: {
      facebook: 'https://www.facebook.com/',
      linkedin: 'https://www.facebook.com/',
      dribble: 'https://www.facebook.com/',
      behance: 'https://www.facebook.com/',
    },
  },
  {
    id: 7,
    name: 'Tanisha M. Cooke',
    designation: 'UI/UX designer',
    description:
      'I am here to anticipate clearly about the important requirements of our users.',
    is_active: true,
    project_activity: 99,
    email: 'raihanhosen011@gmail.com',
    avatar: '/images/leaderboard/profile-7.jpg',
    social: {
      facebook: 'https://www.facebook.com/',
      linkedin: 'https://www.facebook.com/',
      dribble: 'https://www.facebook.com/',
      behance: 'https://www.facebook.com/',
    },
  },
  {
    id: 8,
    name: 'Tanisha M. Cooke',
    designation: 'UI/UX designer',
    description:
      'I am here to anticipate clearly about the important requirements of our users.',
    is_active: false,
    project_activity: 95,
    email: 'raihanhosen011@gmail.com',
    avatar: '/images/leaderboard/profile-8.jpg',
    social: {
      facebook: 'https://www.facebook.com/',
      linkedin: 'https://www.facebook.com/',
      dribble: 'https://www.facebook.com/',
      behance: 'https://www.facebook.com/',
    },
  },
  {
    id: 9,
    name: 'Tanisha M. Cooke',
    designation: 'UI/UX designer',
    description:
      'I am here to anticipate clearly about the important requirements of our users.',
    is_active: true,
    project_activity: 30,
    email: 'raihanhosen011@gmail.com',
    avatar: '/images/leaderboard/profile-9.jpg',
    social: {
      facebook: 'https://www.facebook.com/',
      linkedin: 'https://www.facebook.com/',
      dribble: 'https://www.facebook.com/',
      behance: 'https://www.facebook.com/',
    },
  },
  {
    id: 10,
    name: 'Tanisha M. Cooke',
    designation: 'UI/UX designer',
    description:
      'I am here to anticipate clearly about the important requirements of our users.',
    is_active: true,
    project_activity: 40,
    email: 'raihanhosen011@gmail.com',
    avatar: '/images/leaderboard/profile-10.jpg',
    social: {
      facebook: 'https://www.facebook.com/',
      linkedin: 'https://www.facebook.com/',
      dribble: 'https://www.facebook.com/',
      behance: 'https://www.facebook.com/',
    },
  },
  {
    id: 11,
    name: 'Tanisha M. Cooke',
    designation: 'Web Developer',
    description:
      'I am here to anticipate clearly about the important requirements of our users.',
    is_active: false,
    project_activity: 60,
    email: 'raihanhosen011@gmail.com',
    avatar: '/images/leaderboard/profile-5.jpg',
    social: {
      facebook: 'https://www.facebook.com/',
      linkedin: 'https://www.facebook.com/',
      dribble: 'https://www.facebook.com/',
      behance: 'https://www.facebook.com/',
    },
  },
  {
    id: 12,
    name: 'Tanisha M. Cooke',
    designation: 'UI/UX designer',
    description:
      'I am here to anticipate clearly about the important requirements of our users.',
    is_active: false,
    project_activity: 50,
    email: 'raihanhosen011@gmail.com',
    avatar: '/images/leaderboard/profile-1.jpg',
    social: {
      facebook: 'https://www.facebook.com/',
      linkedin: 'https://www.facebook.com/',
      dribble: 'https://www.facebook.com/',
      behance: 'https://www.facebook.com/',
    },
  },
  {
    id: 13,
    name: 'Tanisha M. Cooke',
    designation: 'UI/UX designer',
    description:
      'I am here to anticipate clearly about the important requirements of our users.',
    is_active: true,
    project_activity: 80,
    email: 'raihanhosen011@gmail.com',
    avatar: '/images/leaderboard/profile-3.jpg',
    social: {
      facebook: 'https://www.facebook.com/',
      linkedin: 'https://www.facebook.com/',
      dribble: 'https://www.facebook.com/',
      behance: 'https://www.facebook.com/',
    },
  },
  {
    id: 14,
    name: 'Tanisha M. Cooke',
    designation: 'Web Developer',
    description:
      'I am here to anticipate clearly about the important requirements of our users.',
    is_active: true,
    project_activity: 10,
    email: 'raihanhosen011@gmail.com',
    avatar: '/images/leaderboard/profile-7.jpg',
    social: {
      facebook: 'https://www.facebook.com/',
      linkedin: 'https://www.facebook.com/',
      dribble: 'https://www.facebook.com/',
      behance: 'https://www.facebook.com/',
    },
  },
];

export const paymentMethodData: paymentMethodDataType[] = [
  {
    id: 1,
    value: '',
    label: 'Select payment method',
    subText: '',
    imgUrl: '/icons/payments/select.png',
  },
  {
    id: 2,
    value: 'bkash',
    label: 'Bkash',
    subText: '(Instant - 3 business days)',
    imgUrl: '/icons/payments/bkash.png',
  },
  {
    id: 3,
    value: 'bank',
    label: 'Bank (any countries)',
    subText: '(2-7 business days)',
    imgUrl: '/icons/payments/bank.png',
  },
];
export const countryOptionsData: countryOptionsDataType[] = [
  {
    id: 1,
    value: '',
    label: 'Select your country',
    imgUrl: '/icons/countries/globe.png',
  },
  {
    id: 2,
    value: 'bangladesh',
    label: 'Bangladesh',
    imgUrl: '/icons/countries/bangladesh.png',
  },
  {
    id: 3,
    value: 'bank',
    label: 'India',
    imgUrl: '/icons/countries/india.png',
  },
  {
    id: 4,
    value: 'pakistan',
    label: 'Pakistan',
    imgUrl: '/icons/countries/pakistan.png',
  },
  {
    id: 5,
    value: 'usa',
    label: 'USA',
    imgUrl: '/icons/countries/united-states.png',
  },
];

export const leaderboardSelectData: leaderboardSelectDataType[] = [
  {
    title: 'All Team Members',
    value: '',
  },
  {
    title: 'Team Leaders',
    value: 'Team Leader',
  },
  {
    title: 'UI/UX designer',
    value: 'UI/UX designer',
  },
  {
    title: 'Developer',
    value: 'Developer',
  },
  {
    title: 'MERN Stack Developer',
    value: 'MERN Stack Developer',
  },
  {
    title: 'Social Media Manager',
    value: 'Social Media Manager',
  },
  {
    title: 'Graphic Designer',
    value: 'Graphic Designer',
  },
  {
    title: 'Video Designer',
    value: 'Video Designer',
  },
  {
    title: 'Virtual Assistant',
    value: 'Virtual Assistant',
  },
  {
    title: 'Content Writer',
    value: 'Content Writer',
  },
  {
    title: 'Hiring Manager',
    value: 'Hiring Manager',
  },
  {
    title: 'Human Resources',
    value: 'Human Resources',
  },
  {
    title: 'Marketing Consultant',
    value: 'Marketing Consultant',
  },
  {
    title: 'Admin',
    value: 'Admin',
  },
];

export const monthsName = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const careerOptionsData: careerOptionsDataType[] = [
  { title: 'Designer', tabNumber: 1 },
  { title: 'Developer', tabNumber: 2 },
  { title: 'Marketing', tabNumber: 3 },
  { title: 'Virtual Assistant', tabNumber: 4 },
  { title: 'Project Manager', tabNumber: 5 },
  { title: 'Internship', tabNumber: 6 },
];

export const dashBoardSocialLinks: DashBoardSocialLinkType[] = [
  {
    link: 'https://www.facebook.com/greggdigital',
    src: '/images/socials/facebook.svg',
  },
  {
    link: 'https://twitter.com/digital_gregg',
    src: '/images/socials/twitter.svg',
  },
  {
    link: 'https://www.instagram.com/digital_gregg',
    src: '/images/socials/instagram.svg',
  },
  {
    link: 'https://www.linkedin.com/company/digitalgregg',
    src: '/images/socials/linkedin.svg',
  },
  {
    link: 'https://www.youtube.com/channel/UCUX5-PZx0prRRiIceq9Z3VA',
    src: '/images/socials/youtube.svg',
  },
  {
    link: 'https://www.tiktok.com/@digital.gregg',
    src: '/images/socials/tiktok.svg',
  },
];

export const clientSildeData: clientSildeDataType[] = [
  {
    imgSrc: '/images/slider/slider-1.png',
  },
  {
    imgSrc: '/images/slider/slider-2.png',
  },
  {
    imgSrc: '/images/slider/slider-3.png',
  },
  {
    imgSrc: '/images/slider/slider-4.png',
  },
  {
    imgSrc: '/images/slider/slider-5.png',
  },
  {
    imgSrc: '/images/slider/slider-6.png',
  },
];

export const homeNavData: homeNavProps[] = [
  { path: '/', label: 'Home' },
  { path: '/jobs', label: 'Jobs' },
  { path: '/contact-us', label: 'Contact' },
];

export const requestsPageData: RequestPageType[] = [
  {
    navText: 'Request Timeoff',
    pageTitle: 'Request Timeoff',
    // component: <RequestsTimeOf />,
  },
  {
    navText: 'User Info Request',
    pageTitle: 'User info request',
    // component: <UserInfoRequests />,
  },
  {
    navText: 'Password Request',
    pageTitle: 'Forget Password Request',
    // component: <PasswordRequest />,
  },
  {
    navText: 'Account Request',
    pageTitle: 'Account Request',
    // component: <PasswordRequest />,
  },
  {
    navText: 'Change Off Day Request',
    pageTitle: 'Change Off Day Request',
    // component: <PasswordRequest />,
  },
];

export const addUserDesignationDatas: addUserDesignationDatasType[] = [
  {
    title: 'Select Role',
    value: '',
  },
  {
    title: 'UI/UX Designer',
    value: 'UI/UX Designer',
  },
  {
    title: 'Developer',
    value: 'Developer',
  },
  {
    title: 'MERN Stack Developer',
    value: 'MERN Stack Developer',
  },
  {
    title: 'Social Media Manager',
    value: 'Social Media Manager',
  },
  {
    title: 'Graphic Designer',
    value: 'Graphic Designer',
  },
  {
    title: 'Video Designer',
    value: 'Video Designer',
  },
  {
    title: 'Virtual Assistant',
    value: 'Virtual Assistant',
  },
  {
    title: 'Content Writer',
    value: 'Content Writer',
  },
  {
    title: 'Hiring Manager',
    value: 'Hiring Manager',
  },
  {
    title: 'Human Resources',
    value: 'Human Resources',
  },
  {
    title: 'Marketing Consultant',
    value: 'Marketing Consultant',
  },
  {
    title: 'Admin',
    value: 'Admin',
  },
];

export const currentEmployeeOfTheMonthDatas: currentEmployeeOfTheMonthDataType[] =
  [
    {
      name: 'Sarah K. Gilles',
      image: '/images/leaderboard-profile.jpg',
      country: 'Bangladesh',
      dgCoin: 220099,
    },
    {
      name: 'Sarah K. Gilles',
      image: '/images/leaderboard-profile.jpg',
      country: 'Bangladesh',
      dgCoin: 220099,
    },
    {
      name: 'Sarah K. Gilles',
      image: '/images/leaderboard-profile.jpg',
      country: 'Pakistan',
      dgCoin: 220099,
    },
  ];

export const settingInformationInputDatas: settingInformationDataTypeProps[] = [
  {
    label: 'First name',
    placeholder: 'Enter first name',
    type: 'text',
    name: 'firstName',
    required: true,
    id: 'firstName',
  },
  {
    label: 'Last name',
    placeholder: 'Enter last name',
    type: 'text',
    name: 'lastName',
    required: true,
    id: 'lastName',
  },
  {
    label: 'Email',
    placeholder: 'Enter email',
    type: 'email',
    name: 'email',
    required: true,
    id: 'email',
  },
  {
    label: 'Phone',
    placeholder: 'Enter phone',
    type: 'number',
    name: 'phone',
    required: false,
    id: 'phone',
  },
  {
    label: 'Address',
    placeholder: 'Enter your address',
    type: 'text',
    name: 'address',
    required: false,
    id: 'address',
  },
  {
    label: 'Experience',
    placeholder: 'example: 1',
    type: 'number',
    name: 'experience',
    required: false,
    id: 'experience',
  },
  {
    label: 'Fiverr',
    placeholder: 'Enter your fiverr link',
    type: 'text',
    name: 'fiverr',
    required: false,
    id: 'fiverr',
  },
  {
    label: 'Upwork',
    placeholder: 'Enter your upwork link',
    type: 'text',
    name: 'upwork',
    required: false,
    id: 'upwork',
  },
  {
    label: 'Facebook',
    placeholder: 'Enter facbook',
    type: 'text',
    name: 'facebook',
    required: false,
    id: 'facebook',
    error: 'Please enter valid facebook url!',
  },
  {
    label: 'Linkedin',
    placeholder: 'Enter linkedin',
    type: 'text',
    name: 'linkedin',
    required: false,
    id: 'linkedin',
    error: 'Please enter valid linkedin url!',
  },
  {
    label: 'Dribble',
    placeholder: 'Enter dribble',
    type: 'text',
    name: 'dribble',
    required: false,
    id: 'dribble',
    error: 'Please enter valid dribble url!',
  },
  {
    label: 'Behance',
    placeholder: 'Enter behance',
    type: 'text',
    name: 'behance',
    required: false,
    id: 'behance',
    error: 'Please enter valid behance url!',
  },
  {
    label: 'Github',
    placeholder: 'Enter github',
    type: 'text',
    name: 'github',
    required: false,
    id: 'github',
    error: 'Please enter valid github url!',
  },
  {
    label: 'Others',
    placeholder: 'Enter others platforms',
    type: 'text',
    name: 'others',
    required: false,
    id: 'others',
    error: 'Please enter valid others url!',
  },
];

export const leaderboardBadgeCardDatas: leaderboardBadgeCardDataType[] = [
  {
    title: 'Employee of the month',
    givenOn: '(November 2022)',
  },
  {
    title: 'Employee of the month',
    givenOn: '(November 2021)',
  },
  {
    title: 'Employee of the month',
    givenOn: '(November 2020)',
  },
];

export const theadDatas: theadDatasType[] = [
  { colName: 'Username' },
  { colName: 'Email' },
  { colName: 'Role' },
  { colName: 'Join Date' },
  { colName: 'Request' },
  { colName: 'Action' },
];

export const addUserWorkingAsDatas: addUserDesignationDatasType[] = [
  {
    title: 'Select Working As',
    value: '',
  },
  {
    title: 'Team Member',
    value: 'Team Member',
  },
  {
    title: 'Team Leader',
    value: 'Team Leader',
  },
  {
    title: 'Intern',
    value: 'Intern',
  },
  {
    title: 'Trial Member',
    value: 'Trial Member',
  },
  {
    title: 'Probation Member',
    value: 'Probation Member',
  },
  {
    title: 'Project Based',
    value: 'Project Based',
  },
  {
    title: 'On Leave',
    value: 'On Leave',
  },
];

export const jobPlaceDatas: leaderboardSelectDataType[] = [
  {
    title: 'Select Type',
    value: '',
  },
  {
    title: 'Remote',
    value: 'remote',
  },
  {
    title: 'On SIte',
    value: 'on-site',
  },
  {
    title: 'Hybrid',
    value: 'hybrid',
  },
];

export const jobCategoryDatas: leaderboardSelectDataType[] = [
  {
    title: 'Select Category',
    value: '',
  },
  {
    title: 'Designer',
    value: 'designer',
  },
  {
    title: 'Developer',
    value: 'developer',
  },
  {
    title: 'Marketing',
    value: 'marketing',
  },
  {
    title: 'Virtual Assistant',
    value: 'virtual assistant',
  },
  {
    title: 'Project Manager',
    value: 'project manager',
  },
  {
    title: 'Internship',
    value: 'internship',
  },
];

export const statusDatas: leaderboardSelectDataType[] = [
  {
    title: 'Select status',
    value: '',
  },
  {
    title: 'Active',
    value: 'active',
  },
  {
    title: 'Inactive',
    value: 'inactive',
  },
];

export const userManagementSortData: leaderboardSelectDataType[] = [
  {
    title: 'Sorted By',
    value: '',
  },
  {
    title: 'A-Z',
    value: 'a-z',
  },
  {
    title: 'Newest employee',
    value: 'newest-employee',
  },
  {
    title: 'Oldest employee',
    value: 'oldest-employee',
  },
];

// drawback type
export const drawbackTypes: DrawbackTypes[] = [
  { value: 'late-meeting', label: 'Late Meeting' },
  { value: 'missed-day', label: 'Missed Day' },
  { value: 'no-work', label: 'No Work' },
  { value: 'leave-early', label: 'Leave Early' },
  // { value: 'not-completed-in-time', label: 'Not Completed 8 hours' },
  { value: 'others', label: 'Other' },
];

// drawback type
export const drawbackSystemTypes: DrawbackTypes[] = [
  { value: '', label: 'Select Type' },
  { value: 'by-coin', label: 'Coin Drawback' },
  { value: 'by-dollar', label: 'Dollar Drawback' },
];

export const taskDropdownOptions: DrawbackTypes[] = [
  { label: 'All', value: '' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Completed Late', value: 'Completed Late' },
  { label: 'Approved', value: 'Approved' },
  { label: 'Approved Late', value: 'Approved Late' },
  { label: 'Blocked', value: 'Blocked' },
];

export const timeoffTabDatas = [
  {
    label: 'Late Meeting',
    tab: 1
  },
  {
    label: 'Sick Day And Vacation',
    tab: 2
  },
  {
    label: 'Partial Timeoff',
    tab: 3
  },
  {
    label: 'Change Off Day',
    tab: 4
  },
]

export const timeoffTypes: addUserDesignationDatasType[] = [
  {
    title: 'Select',
    value: '',
  },
  {
    title: 'By Day',
    value: 'by-day',
  },
  {
    title: 'By Hour',
    value: 'by-hour',
  },
  {
    title: 'By Min',
    value: 'by-min',
  },
];
