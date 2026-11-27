export interface TranslationCopy {
  activity: {
    title: string;
    subtitle: string;
    liveStream: string;
    verified: string;
  };
}

export const translations: TranslationCopy = {
  activity: {
    title: "Recent Activity",
    subtitle: "Latest community activity.",
    liveStream: "Live Stream",
    verified: "Verified"
  }
};
