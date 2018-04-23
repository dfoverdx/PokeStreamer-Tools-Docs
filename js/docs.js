import * as fa from './font-awesome';
import nextBtn from './widgets/next-btn';
import modalImages from './widgets/modal-images';

import BuildMD from '../docs/build.md';
import ConfigurationMD from '../docs/configuration.md';
import CreditsMD from '../docs/credits.md';
import IntroMD from '../docs/intro.md';
import RoadmapMD from '../docs/roadmap.md';
import ScreenshotsMD from '../docs/screenshots.md';
import SetupMD from '../docs/setup.md';
import SoullinkMD from '../docs/soullink.md';
import StylingMD from '../docs/styling.md';
import TutorialsMD from '../docs/tutorials.md';
import UsageMD from '../docs/usage.md';

import RenderMD from '../js/renderers/md-content';

const args = Object.assign({}, fa, { nextBtn }, modalImages);

export const 
    Build = RenderMD(BuildMD(args)),
    Configuration = RenderMD(ConfigurationMD(args)),
    Credits = RenderMD(CreditsMD(args)),
    Intro = RenderMD(IntroMD(args)),
    Roadmap = RenderMD(RoadmapMD(args)),
    Screenshots = RenderMD(ScreenshotsMD(args)),
    Setup = RenderMD(SetupMD(args)),
    Soullink = RenderMD(SoullinkMD(args)),
    Styling = RenderMD(StylingMD(args)),
    Tutorials = RenderMD(TutorialsMD(args)),
    Usage = RenderMD(UsageMD(args));