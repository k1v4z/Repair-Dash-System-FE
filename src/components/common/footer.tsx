import Icons from "../icons";
import routePath from "@/config/route";
const NAVIGATION_LINKS = {
  main: [
    { name: "Giới Thiệu", href: routePath.about },
    { name: "Câu Hỏi Thường Gặp", href: routePath.faq },
    { name: "Điều Khoản", href: routePath.terms },
    { name: "Bảo Mật", href: routePath.privacy },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: <Icons glyph="facebook" className="size-6" />,
    },
    {
      name: "Twitter",
      href: "#",
      icon: <Icons glyph="twitter" className="size-6" />,
    },
    {
      name: "Instagram",
      href: "#",
      icon: <Icons glyph="instagram" className="size-6" />,
    },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav
          className="flex flex-wrap justify-center -mx-5 -my-2"
          aria-label="Footer"
        >
          {NAVIGATION_LINKS.main.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <a
                href={item.href}
                className="text-base text-gray-500 hover:text-gray-900 transition-colors"
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          {NAVIGATION_LINKS.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <span className="sr-only">{item.name}</span>
              {item.icon}
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; 2025 Repair Dash. Đã đăng ký bản quyền.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
