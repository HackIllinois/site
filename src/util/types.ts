export type WithId<Type> = Type & { id: string; };

export type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type FileType = 'resume' | 'photo' | 'blobstore';

export type RegistrationType = {
  firstName: string;
  lastName: string;
  // timezone: string;
  gender: string;
  email: string;
  race: string[];
  // ageMin: string[];
  selfTransport: 
  | 'YES'
  | 'NO';
  purdueTransport:
  | 'YES'
  | 'NO'
  | 'N/A';
  location: string;
  degreePursued:
  | 'ASSOCIATES'
  | 'BACHELORS'
  | 'MASTERS'
  | 'PHD'
  | 'GRADUATED'
  | 'OTHER';
  school: string;
  major: string;
  graduationYear: number;
  resumeFilename?: string | undefined;
  whyHack: string;
  programmingYears: number;//number;
  programmingAbility: number;//number;
  // hasInternship?: 'YES' | 'NO';
  interests: string[];
  outreachSurvey: string[];
  dietary: string[];
};

export type RegistrationRole = 'attendee' | 'mentor';

export interface EventType {
  id: string;
  name: string;
  description: string;
  isAsync?: boolean;
  startTime: number;
  endTime: number;
  locations: {
    description: string;
    tags: string[];
    latitude: number;
    longitude: number;
  }[];
  sponsor?: string;
  eventType: string;
  points: number;
}

export type DayType = {
  date: Date;
  dayOfWeek: string;
  month: string;
  dayOfMonth: number;
  events: EventType[];
};

export type WeekType = {
  date: Date;
  index?: number;
};

export type PrizeType = {
  name: string;
  description: string;
  sponsor: string;
};

export type MentorTimeslotType = {
  id: number;
  text: string;
  email: string;
  start_date: string;
  end_date: string;
};

export type RSVPType = {
  isAttending: boolean;
};

export type DecisionType = {
  status: string;
};

export type ProfileType = Partial<{
  firstName: string;
  lastName: string;
  timezone: string;
  discord: string;
  avatarUrl: string;
}>;

export type ProfileResponseType = WithId<Required<ProfileType>> & { points: number };

export type ZoomLinks = {
  [id: string]: string;
};