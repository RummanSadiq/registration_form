export interface UserDetail {
  name: string;
  email: string;
  password: string;
}

export interface ProfileInfo {
  bio: string;
  imageSrc: string;
}

export interface UserPreference {
  notificationSetting: boolean;
  privacySetting: boolean;
}

export interface FormInfo {
  userDetail: UserDetail;
  profileInfo: ProfileInfo;
  userPreference: UserPreference;
}
