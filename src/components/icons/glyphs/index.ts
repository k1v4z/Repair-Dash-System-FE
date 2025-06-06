import Eye from "./eye";
import { FacebookIcon } from "./facebook";
import { InstagramIcon } from "./instagram";
import { TwitterIcon } from "./twitter";
import { Profile } from "./profile";
import { Logout } from "./logout";
import { Setting } from "./setting";
import { Search } from "./search";
import { Arrow } from "./arrow";
import { ArrowUp } from "./arrow-up";
import { ArrowDown } from "./arrow-down";
import { Heart } from "./heart";
import { Chevron } from "./chevron";
import { Store } from "./store";
import { Wrench } from "./wrench";
import { Location } from "./location";
import { Upload } from "./upload";
import { X } from "./x";
import { Star } from "./star";
import { Calendar } from "./calendar";
import { UploadImg } from "./upload-img";
import { Loader } from "./loader";
import { Warning } from "./warning";
import { AlertCircle } from "./alert-circle";
import { CheckCircle } from "./check-circle";
import { Phone } from "./phone";
import { Message } from "./message";
import { HalfStar } from "./half-star";
import { Camera } from "./camera";
import { BookMark } from "./book-mark";
import { Trash } from "./trash";
import CheckCircle2 from "./check-circle2";
import NoteComplete from "./note-complete";
import WarningCircle from "./warning-circle";
import OrderCancel from "./order-cancel";
import { Edit } from "./edit";
import { Delete } from "./delete";
import { Plus } from "./plus";
import { EyeNonBorder } from "./eye-non-border";
import { Chart } from "./chart";
import { Block } from "./block";
import { Check } from "./check";
import { AvatarDefault } from "./avatar-default";
import { Box } from "./box";
import { Loading } from "./loading";
import { Clock } from "./clock";
import { Close } from "./close";
import { OrderList } from "./order-list";
import Send from "./send";
import { Minus } from "./minus";
import { Messenger } from "./messenger";
import { Dashboard } from "./dashboard";
import { ManageUser } from "./manage-user";
import { Menu } from "./menu";
import { Home } from "./home";
import { Refresh } from "./refresh";
import { Lock } from "./lock";
import { Unlock } from "./unlock";
import { UserRound } from "./user-round";
import { Admin } from "./admin";
import Feedback from "./feedback";
import { ClipboardX } from "./clipboard-x";
import { Bell } from "./bell";
import { ClipboardCheck } from "./clipboard-check";
import { ClipboardPen } from "./clipboard-pen";
import { Clipboard } from "./clipboard";
import { MessageSquare } from "./message-square";
import { ManageFeedback } from "./manage-feedback";

export const glyphs = {
  alertCircle: AlertCircle,
  checkCircle: CheckCircle,
  checkCircle2: CheckCircle2,
  noteComplete: NoteComplete,
  warningCircle: WarningCircle,
  orderCancel: OrderCancel,
  eye: Eye,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  profile: Profile,
  logout: Logout,
  setting: Setting,
  search: Search,
  arrow: Arrow,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  heart: Heart,
  chevron: Chevron,
  store: Store,
  wrench: Wrench,
  location: Location,
  upload: Upload,
  warning: Warning,
  x: X,
  star: Star,
  calendar: Calendar,
  uploadImg: UploadImg,
  loader: Loader,
  phone: Phone,
  message: Message,
  halfStar: HalfStar,
  camera: Camera,
  bookMark: BookMark,
  trash: Trash,
  edit: Edit,
  delete: Delete,
  plus: Plus,
  eyeNonBorder: EyeNonBorder,
  chart: Chart,
  block: Block,
  check: Check,
  avatarDefault: AvatarDefault,
  box: Box,
  loading: Loading,
  clock: Clock,
  close: Close,
  orderList: OrderList,
  send: Send,
  minus: Minus,
  messenger: Messenger,
  dashboard: Dashboard,
  manageUser: ManageUser,
  menu: Menu,
  home: Home,
  refresh: Refresh,
  lock: Lock,
  unlock: Unlock,
  userRound: UserRound,
  admin: Admin,
  feedback: Feedback,
  clipboardX: ClipboardX,
  clipboardCheck: ClipboardCheck,
  clipboardPen: ClipboardPen,
  clipboard: Clipboard,
  bell: Bell,
  messageSquare: MessageSquare,
  manageFeedback: ManageFeedback,
};

export type Glyph = {
  glyph: keyof typeof glyphs;
};
