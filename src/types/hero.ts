export interface TextStage {
  id: number;
  stageCode: string;
  category: string;
  headline: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export interface FrameSequenceConfig {
  basePath: string;
  filePrefix: string;
  fileExtension: string;
  totalFrames: number;
  padLength: number;
  scrollMultiplierVh: number; // e.g. 400 for 400vh
}

export interface HeroConfig {
  frames: FrameSequenceConfig;
  stages: TextStage[];
}
