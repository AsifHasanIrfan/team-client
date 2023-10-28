import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import React from 'react';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type ButtonProps = {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  rounded?: 'full' | 'md';
  loading?: boolean;
  loadingText?: string;
} & React.ComponentProps<'button'>;

export type ContactInfoCardProps = {
  icon: ReactNode;
  title: ReactNode;
  content: ReactNode;
};

export type SocialLink = {
  icon: ReactNode;
  url: string;
};

export type PortfolioInput = {
  name: string;
  label: String;
  placeholder?: String;
};

export type LandingPageLayoutProps = {
  children?: ReactNode;
};

export type FooterLink = {
  text: ReactNode;
  url: string;
};

export type FooterLinksRendererProps = {
  label: ReactNode;
  links: FooterLink[];
};

export type DashboardSidebarLink = {
  icon: ReactNode;
  url: string;
  text: ReactNode;
  pageTitle: ReactNode;
  forAdmin?: boolean;
};
export type AllDashboardLinkType = {
  icon?: ReactNode;
  url: string;
  text: ReactNode;
  pageTitle: ReactNode;
};

export type DashboardHeaderProps = {
  setIsOpenMobileNav: (prev: any) => void;
};

export type ReactSelectFormatProps = {
  id: number;
  value?: string;
  label?: string;
  subText?: string;
  imgUrl?: any;
};
export type ProfileStatCardProps = {
  icon: ReactNode;
  label: ReactNode;
  value: ReactNode;
  className?: string;
};

export type ProfileDetailType = {
  label: ReactNode;
  value: ReactNode;
};

export type ProfileDetailsTableProps = {
  profileDetails: ProfileDetailType[];
};

export type TaskDataType = {
  id: number;
  title: string;
  dueDate: string;
  dueTime: string;
  description: string;
  status: string;
  attachments?: any;
  dgCoin?: number;
};
export type RequestsDataType = {
  id: number;
  userName: string;
  dueDate: string;
  dueTime: string;
};

export type FutureWorkDataType = {
  img: string;
  title: string;
  description: string;
};

export type InclusiveDataType = {
  img: string;
  title: string;
  description: string;
};

export type CareerDataType = {
  name: string;
  vacancy: string;
  type: string;
  link: string;
};

export type CareerDataTypeProps = {
  title: string;
  datas: CareerDataType[];
  classNameGsap?: boolean;
};

export type AvailableBenefitsype = {
  title: string;
  img: string;
  description: string;
  date: string;
};

export type GotBenefitsType = {
  title: string;
  img: string;
  date: string;
};

export type MyRewardDataType = {
  image: string;
  title: string;
  duration: string;
  reward: number;
};

export type MyRewardDataTypeProps = {
  data: MyRewardDataType;
};

export type DailyTokenDataType = {
  title: string;
  point: number;
  status: string;
};

export type DailyTokenDataTypeProps = {
  data: DailyTokenDataType;
};

export type TaskTableProps = {
  taskTitle: String;
  dueDate: String;
  dueTime: String;
  description: String;
  taskStatus: String;
  taskStatusTitle: String;
};

export type ModalProps = {
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  footer?: boolean;
  headerDesign?: boolean;
  headerFixed?: boolean;
};

export type RowModal = {
  dataId: any;
  open: boolean;
  setOpen: (open: boolean) => void;
  availableVacationDays?: any;
  availableSickDays?: any;
  weeklyOffday?: any;
  token?: any;
  userId?: any;
  userFetch?: any;
  members?: any;
};

export type TaskRowModal = {
  title: string;
  description: string;
  dueDateAndTime: any;
  status: string;
  attachments: any;
  open: boolean;
  revision_description?: string;
  blocked_description?: string;
  latetask_description?: string;
  dgCoin?: number;
  worker?: any;
  _id: any;
  submissionDate?: any;
  setOpen: (open: boolean) => void;
  inRevisionCount?: any;
};

export type DashboardHeaderTitltProps = {
  title: String;
  link: String;
};

export type DrawbackDataType = {
  image: string;
  name: string;
  date: string;
  payment: string;
};

export type DrawbackDataTypeProps = {
  data: DrawbackDataType;
};

export type SkillsProps = {
  designer?: Array<String>;
  developer?: Array<String>;
  marketing?: Array<String>;
  virtualAssistent?: Array<String>;
  PR?: Array<String>;
};
export type timeOffUpcomingDataType = {
  startDate: string;
  endDate: string;
  type: string;
  totalTime: { day: string; hour: string };
  status: 'approved' | 'rejected';
  statusTite: string;
};

export type dashboardNotificationProp = {
  iconBtnStyle: string;
};

export type dashboardHeaderLeftProp = {
  setIsOpenMobileNav: (open: any) => void;
  pageTitle: ReactNode;
};

export type dashboardQuestionProp = {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleVideoModal: any;
  handlePrivacyModal?: any;
  videoRef: any;
};

export type dashboardQuestionModalProp = {
  open: boolean;
  setOpen: (open: boolean) => void;
  iconBtnStyle: string;
  displayProperty: boolean;
};

export type dashboardNotificationCardDataType = {
  url: string;
  content: string;
  isRead?: Boolean;
  isArchived?: Boolean;
  createdAt?: any;
};

export type dashboardNotificationCardDataProps = {
  data: dashboardNotificationCardDataType;
};

export type LeaderboardCardType = {
  id?: Number;
  name?: String;
  designation?: String;
  description?: String;
  is_active?: boolean;
  project_activity?: Number;
  email?: String;
  social?: Object;
  avatar?: String;
  onClick?: any;
};

export type ConverterInputProps = {
  amount: Number;
  currency: String;
  onAmountChange: any;
  onCurrencyChange: any;
  currencies: any;
};

export type paymentMethodDataType = {
  id: number;
  value: string;
  label: string;
  subText: string;
  imgUrl: string;
};
export type countryOptionsDataType = {
  id: number;
  value: string;
  label: string;
  imgUrl: string;
};

export type paymentMethodDataTypeprops = {
  datas: paymentMethodDataType[];
  selectedOption: paymentMethodDataType;
  setSelectedOptions: (open: paymentMethodDataType) => void;
};

export type eventDataTypes = {
  date: number;
  month: string;
  countMonth: number;
  day: string;
  year: number;
  fullDate: string;
}[];

export type eventTimeDataTypes = {
  startTime: string;
  endTime: string;
}[];

export type singleRowProps = {
  taskTitle: String;
  dueDate: String;
  dueTime: String;
  taskStatus: String;
  taskStatusTitle: String;
  id?: Number;
  setData?: any;
  index?: any;
  data?: any;
};

export type leaderboardSelectDataType = {
  title: string;
  value: string;
};

export type CalendarProps = {
  change: Date;
  onChange: any;
  reset: boolean;
  setReset: (reset: boolean) => void;
};

export type careerOptionsDataType = {
  title: string;
  tabNumber: number;
};

export type DashBoardSocialLinkType = {
  link: string;
  src: string;
};

export type StepCounterProps = {
  nextClick: any;
};

export type clientSildeDataType = {
  imgSrc: string;
};

export type homeNavProps = {
  path: String;
  label: String;
};
export type InternshipModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export type InternshipModalInputLabelType = {
  label: string;
  name: string;
};
export type InternshipPageProps = {
  setIsOpen: any;
};
export type InternShipSubscribeFormIntialvalue = {
  name: string;
  email: string;
};

export type InternshipSubscribeFormProps = {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
};

export type EmployeOptionType = {
  value: string;
  label: string;
  job: string;
  id: any;
};

export type RequestPageType = {
  pageTitle: string;
  navText: string;
  component?: ReactNode;
};

export type DataProviderProps = {
  children: ReactNode;
};

export type fetchDataProps = {
  url: URL;
  post?: any;
  token?: String;
};

export type IRootState = {
  auth: any;
  global: any;
  users: any;
  tasks: any;
  notification: any;
};

export type addUserDesignationDatasType = {
  title: string;
  value: string;
};

export type addUserAPISendDataType = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  workingAs: string;
  designation: string;
};

export type currentEmployeeOfTheMonthDataType = {
  name: string;
  image: string;
  country: string;
  dgCoin: number;
};

export type currentEmployeeOfTheMonthDataTypeProps = {
  data: currentEmployeeOfTheMonthDataType;
  index: number;
};

export type settingInformationDataTypeProps = {
  label: string;
  placeholder: string;
  type: string;
  name: string;
  id: string;
  required: boolean;
  error?: string;
};

export type TaskHeaderProps = {
  activeTable: string;
  setActiveTable: (activeTable: string) => void;
};
export type TasksTableProps = {
  activeTable: string;
};

export type SendTimeoffAPISendDataType = {
  type: string;
  startDate: string;
  endDate: string;
  lateTime: string;
  description: string;
  user: string;
  status: string;
  partialStartTime: any;
  partialEndTime: any;
};

export type TimeoffAPISendDataType = {
  _id: string;
  type: string;
  startDate: string;
  endDate: string;
  description: string;
  user: string;
  status: string;
};

export type GetTimeoffAPIRequestDataType = {
  _id: string;
  user: {
    _id: string;
    username: string;
  };
  type: string;
  startDate: string;
  endDate: string;
  lateTime: string;
  description: string;
  status: string;
  partialStartTime?: any;
  partialEndTime?: any;
};

export type leaderboardBadgeCardDataType = {
  title: string;
  givenOn: string;
};

export type GetTimeoffAPIRequestDataTypeProp = {
  _id: string;
  user: {
    username: string;
  };
  type: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type SalaryTableDataType = {
  startDate: string;
  amount: string;
  status: string;
  user: any;
};

export type GetTeamAPIRequestDataTypeProp = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: string;
  bio: string;
  designation: string;
  isActive: string;
  avatar: string;
  createdAt: string;
  isArchived: boolean;
  dgCoin?: number;
  timeOff: [];
  workingAs: string;
};

export type theadDatasType = {
  colName: string;
};

export interface StorageObj {
  expiry: moment.Moment;
}

export type forgetPasswordDataType = {
  _id: string;
  username: string;
  email: string;
  status: string;
};

export type taskOptionType = {
  value: string;
  label: string;
};

export type DrawbackTypes = {
  value: string;
  label: string;
};
