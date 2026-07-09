import { HugeiconsIcon, type HugeiconsProps, type IconSvgElement } from "@hugeicons/react"
import {
  Airplane01Icon,
  AlertCircleIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUp01Icon,
  ArrowUpDownIcon,
  Award01Icon,
  BarChartIcon,
  Calendar01Icon,
  CalendarDaysIcon,
  CallIcon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  CommandIcon,
  CircleIcon as HugeCircleIcon,
  ChevronDownIcon as HugeChevronDownIcon,
  ChevronLeftIcon as HugeChevronLeftIcon,
  ChevronRightIcon as HugeChevronRightIcon,
  ChevronUpIcon as HugeChevronUpIcon,
  Clock01Icon,
  DollarSignIcon,
  EyeIcon,
  EyeOffIcon,
  File01Icon,
  Facebook01Icon,
  FilterHorizontalIcon,
  DashboardSquare01Icon,
  Globe02Icon,
  GlobeIcon,
  GripVerticalIcon,
  HeartIcon,
  Home01Icon,
  Image01Icon,
  InformationCircleIcon,
  InstagramIcon,
  KitchenUtensilsIcon,
  LayoutGridIcon,
  Linkedin02Icon,
  LoaderPinwheelIcon,
  Mail01Icon,
  MailSend01Icon,
  MapPinIcon,
  Megaphone02Icon,
  Menu01Icon,
  Message01Icon,
  MessageCircleReplyIcon,
  MinusSignIcon,
  Moon01Icon,
  Package01Icon,
  PercentIcon,
  PencilEdit02Icon,
  QuoteUpIcon,
  Search01Icon,
  Shield01Icon,
  SparklesIcon,
  StarIcon as HugeStarIcon,
  Sun01Icon,
  Tag01Icon,
  Target01Icon,
  TwitterIcon,
  Upload01Icon,
  UserGroupIcon,
  UserCircleIcon,
  UserIcon,
  Wrench01Icon,
  YoutubeIcon,
  ZapIcon,
  SaveAllIcon,
  PlusSignIcon,
  Baby01Icon,
  Delete02Icon,
  Share02Icon,
  Logout02Icon,
  Settings02Icon,
  TrendingUpDownIcon,
} from "@hugeicons/core-free-icons"

type IconComponent = (props: HugeiconsProps) => JSX.Element

function createIcon(icon: IconSvgElement): IconComponent {
  return function Icon(props: HugeiconsProps) {
    return <HugeiconsIcon icon={icon} {...props} />
  }
}

export const Search = createIcon(Search01Icon)
export const CheckCircle = createIcon(CheckmarkCircle02Icon)
export const X = createIcon(Cancel01Icon)
export const Clock = createIcon(Clock01Icon)
export const Calendar = createIcon(Calendar01Icon)
export const Zap = createIcon(ZapIcon)
export const ArrowRight = createIcon(ArrowRight01Icon)
export const ArrowLeft = createIcon(ArrowLeft01Icon)
export const ArrowUp = createIcon(ArrowUp01Icon)
export const ArrowUpDown = createIcon(ArrowUpDownIcon)
export const Award = createIcon(Award01Icon)
export const BarChart3 = createIcon(BarChartIcon)
export const Star = createIcon(HugeStarIcon)
export const StarIcon = createIcon(HugeStarIcon)
export const DollarSign = createIcon(DollarSignIcon)
export const MapPin = createIcon(MapPinIcon)
export const Percent = createIcon(PercentIcon)
export const Quote = createIcon(QuoteUpIcon)
export const Facebook = createIcon(Facebook01Icon)
export const Instagram = createIcon(InstagramIcon)
export const Youtube = createIcon(YoutubeIcon)
export const Linkedin = createIcon(Linkedin02Icon)
export const Globe = createIcon(GlobeIcon)
export const Globe2 = createIcon(Globe02Icon)
export const Send = createIcon(MailSend01Icon)
export const Plus = createIcon(PlusSignIcon)
export const Minus = createIcon(MinusSignIcon)
export const Users = createIcon(UserGroupIcon)
export const User = createIcon(UserIcon)
export const Baby = createIcon(Baby01Icon)
export const Plane = createIcon(Airplane01Icon)
export const Menu = createIcon(Menu01Icon)
export const Shield = createIcon(Shield01Icon)
export const Target = createIcon(Target01Icon)
export const Sparkles = createIcon(SparklesIcon)
export const Package = createIcon(Package01Icon)
export const Tag = createIcon(Tag01Icon)
export const Sun = createIcon(Sun01Icon)
export const Moon = createIcon(Moon01Icon)
export const Pencil = createIcon(PencilEdit02Icon)
export const Save = createIcon(SaveAllIcon)
export const AlertCircle = createIcon(AlertCircleIcon)
export const Eye = createIcon(EyeIcon)
export const EyeOff = createIcon(EyeOffIcon)
export const Filter = createIcon(FilterHorizontalIcon)
export const GripVertical = createIcon(GripVerticalIcon)
export const Heart = createIcon(HeartIcon)
export const Home = createIcon(Home01Icon)
export const Image = createIcon(Image01Icon)
export const ImageIcon = createIcon(Image01Icon)
export const Phone = createIcon(CallIcon)
export const MessageSquare = createIcon(Message01Icon)
export const LayoutTemplate = createIcon(LayoutGridIcon)
export const Loader2 = createIcon(LoaderPinwheelIcon)
export const Megaphone = createIcon(Megaphone02Icon)
export const CalendarDays = createIcon(CalendarDaysIcon)
export const ChevronDown = createIcon(HugeChevronDownIcon)
export const ChevronLeft = createIcon(HugeChevronLeftIcon)
export const ChevronRight = createIcon(HugeChevronRightIcon)
export const ChevronUp = createIcon(HugeChevronUpIcon)
export const CheckIcon = createIcon(CheckmarkCircle02Icon)
export const CircleIcon = createIcon(HugeCircleIcon)
export const ChevronDownIcon = createIcon(HugeChevronDownIcon)
export const ChevronRightIcon = createIcon(HugeChevronRightIcon)
export const ChevronUpIcon = createIcon(HugeChevronUpIcon)
export const Info = createIcon(InformationCircleIcon)
export const Share2 = createIcon(Share02Icon)
export const Trash2 = createIcon(Delete02Icon)
export const Twitter = createIcon(TwitterIcon)
export const Upload = createIcon(Upload01Icon)
export const UtensilsCrossed = createIcon(KitchenUtensilsIcon)
export const Mail = createIcon(Mail01Icon)
export const Wrench = createIcon(Wrench01Icon)
export const Command = createIcon(CommandIcon)
export const FileText = createIcon(File01Icon)
export const LayoutDashboard = createIcon(DashboardSquare01Icon)
export const LogOut = createIcon(Logout02Icon)
export const MessageCircle = createIcon(MessageCircleReplyIcon)
export const Settings = createIcon(Settings02Icon)
export const TrendingUp = createIcon(TrendingUpDownIcon)
export const UserRound = createIcon(UserCircleIcon)
